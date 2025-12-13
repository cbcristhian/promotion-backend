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
    registeredForCurrentRaffle:true,
    role: "RESIDENT",
    password: "$2b$10$Y15B.LXQqG0rDa1DN1rV4OqnnQep3RNikrsBNf4UF9OxIJLeJ35A2"
  },
  {
    id: "03af2112-66d9-405f-87c1-3c4cc03305fb",
    name: "residente2",
    email: "residente2@email.com",
    apartmentNumber:2,
    registeredForCurrentRaffle:true,
    role: "RESIDENT",
    password: "$2b$10$yiYpz298TTqX4OOokBtSYOUvqMRqhcEOPkXIs8xaBJ3c6zUAyLR0K"
  },
  {
    id: "974fcd96-fb69-4471-bb72-2f352e88ef0a",
    name: "residente3",
    email: "residente3@email.com",
    registeredForCurrentRaffle: true,
    role: "RESIDENT",
    apartmentNumber: 3,
    password: "$2b$10$7o6q5qon3gK3FtmAXEwTAOm962S/Nres/H2VMGC.6GBNT6YKWPa4a"
  },
  {
    id: "25164f46-7133-4244-b1fa-387c01f6acbd",
    name: "residente4",
    email: "residente4@email.com",
    registeredForCurrentRaffle: true,
    role: "RESIDENT",
    apartmentNumber: 4,
    password: "$2b$10$ajTdPbOWeSffipcPbiR9Re13QzKmNYb/wz0Cwd.eFj/iTnrIhgH3."
}

];

module.exports = {
  users,
};