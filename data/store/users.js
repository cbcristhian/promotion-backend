//In-memory data
const users = [
  {
    id: "32c9a760-371c-4479-a828-6a8a76955089",
    name: "Cris",
    email: "cris@email.com",
    role: "ADMIN",
    password: "$2b$10$R4zP.AaNaedcongPhVsQ.OkUhmfjDYryoIubp7bRejFWfipJ2rtHi"
  },
  {
    id: "24a56006-18ba-4ed8-ae34-ca6dcb116f34",
    name: "residente1",
    email: "residente1@email.com",
    apartmentNumber:1,
    registeredForCurrentRaffle:false,
    role: "RESIDENT",
    passwordHash: "$2b$10$Y15B.LXQqG0rDa1DN1rV4OqnnQep3RNikrsBNf4UF9OxIJLeJ35A2"
  },
  {
    id: "03af2112-66d9-405f-87c1-3c4cc03305fb",
    name: "residente2",
    email: "residente2@email.com",
    apartmentNumber:2,
    registeredForCurrentRaffle:true,
    role: "RESIDENT",
    passwordHash: "$2b$10$yiYpz298TTqX4OOokBtSYOUvqMRqhcEOPkXIs8xaBJ3c6zUAyLR0K"
  }
];

module.exports = {
  users,
};