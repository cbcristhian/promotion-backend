const {response,request} = require('express');
const { users } = require('../data/store/users');
const { parkingSpots } = require('../data/store/parking-spots');
const { raffleHistory } = require('../data/store/raffle-history');

const runRaffle=(req=request,res=response)=> {
    const registeredResidents = users.filter(
      u => u.role === "RESIDENT" && u.registeredForCurrentRaffle
    );
  
    if (registeredResidents.length === 0) {
      return res.status(400).json({
        message:"No registered residents for raffle"
      });
    }
  
    const shuffled = [...registeredResidents].sort(
      () => Math.random() - 0.5
    );
  
    const winners = shuffled.slice(0, parkingSpots.length);
    const losers = shuffled.slice(parkingSpots.length);
  
    const assignments = winners.map((resident, index) => ({
      residentId: resident.id,
      parkingSpotId: parkingSpots[index].id,
    }));
  
    const raffle = {
      id: `raffle-${Date.now()}`,
      executedAt: new Date().toISOString(),
      assignments,
      unassignedResidents: losers.map(r => r.id),
    };
  
    raffleHistory.push(raffle);

    // Reset registration
    users.forEach(u => {
      if (u.role === "RESIDENT") {
        u.registeredForCurrentRaffle = false;
      }
    }); 
    const latestRaffle = latestRaffleWithInfo()
    return res.status(200).json({
        message:'Raffle executed successfully',
        latestRaffle
    })
}

const getLatestRaffle=(req=request,res=response)=>{
    const latestRaffle = latestRaffleWithInfo()
    res.status(200).json({
        latestRaffle
    }
    )
}

const latestRaffleWithInfo=()=>{
    const latestRaffle = raffleHistory[raffleHistory.length-1]
    const residents = users.filter(u => u.role === "RESIDENT" );

    const { executedAt, assignments, unassignedResidents } = latestRaffle;

    const residentMap = new Map(residents.map(r => [r.id, r]));
  
    const assigned = assignments.map(entry => {
      const res = residentMap.get(entry.residentId);
      return {
        residentId: entry.residentId,
        name: res?.name,
        apartmentNumber: res?.apartmentNumber,
        parkingSpotId: entry.parkingSpotId
      };
    });
  
    const unassigned = unassignedResidents.map(residentId => {
      const res = residentMap.get(residentId);
      return {
        residentId,
        name: res?.name || "Unknown",
        apartmentNumber: res?.apartmentNumber || "Unknown",
        parkingSpotId: null
      };
    });
  
    return {
      executedAt,
      residents: [...assigned, ...unassigned]
    };
}

module.exports={
    runRaffle, getLatestRaffle
}