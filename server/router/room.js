const router = require('express').Router();
const firebase = require('../db');

const fireStore = firebase.firestore();

router.post("/room", async (req, res) => {
    const { body } = req;
    console.log("ADD ROOMS")
    try {
        await fireStore.collection("rooms").doc().set(body)
        return res.status(200).send("Successfully adding room");
    } catch(err) {
        return res.status(400).send(`ADD ROME FAILED: ${err}`)
    }
})

router.get("/rooms", async (req, res) => {
    const newRooms = [];
    const rooms = await fireStore.collection("rooms").get();

    rooms.forEach(x => {
        const room = {
            id: x.data().id,
            name: x.data().name,
            limitPeople: x.data().limitPeople

        }
        newRooms.push(room)
    })
    res.send(newRooms);
})

module.exports = router;

