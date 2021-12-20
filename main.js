let okButton = document.getElementById("okButton");
let addButton = document.getElementById("addButton");
let calcButton = document.getElementById("recalcButton");
let testButton = document.getElementById("testButton");

let friendsListContainer = document.getElementById("friendsListContainer");
let overlay = document.getElementById("overlay");
let newName = document.getElementById("newName");
let isUpdate = document.getElementById("isUpdate");

let friends = [
    { name: "Carlos", secretFriend: "-1" },
    { name: "Vere", secretFriend: "-1" },
    { name: "Cris", secretFriend: "-1" },
];

calculateSecretFriend = (friendsArray) => {
	if (friendsArray.length < 2) {
		alert("Debes tener al menos dos personas añadidas para calcular el intercambio de regalos.")
	}
    keepTrying = friendsArray.length > 1;
    while (keepTrying) {
        receivers = new Set();
        friendsArray.forEach((friend, index) => {
            while (true) {
                if (receivers.size == friendsArray.length - 1 && !receivers.has(index)) break;
                theIndex = Math.floor(Math.random() * friendsArray.length);
                if (index != theIndex && !receivers.has(theIndex)) {
                    friend.secretFriend = theIndex;
                    receivers.add(theIndex);
                    if (receivers.size == friendsArray.length) keepTrying = false
                    break;
                }
            }
        });
    }
    redrawList(friends);
};

redrawList = (friendsArray) => {
    let oldFriendsList = document.getElementById("friendsList");
    oldFriendsList.remove();
    newFriendsList = document.createElement("div");
    newFriendsList.classList.add("friends-list");
    newFriendsList.id = "friendsList";
	if (friendsArray.length == 0) {
		newFriendsList.classList.add("no-friends");
		noFriendsParagraph = document.createElement("p");
		noFriendsMessage = document.createTextNode("La lista está vacía 😫. Debes añadir al menos dos personas para iniciar el intercambio de regalos!");
		noFriendsParagraph.appendChild(noFriendsMessage);
		newFriendsList.appendChild(noFriendsParagraph);

	}
    friendsArray.forEach((friend, index) => {
        let friendCard = document.createElement("div");
        friendCard.classList.add("friend-card");
        friendCard.id = "friend" + index;

        let friendNameParagraph = document.createElement("p");
        friendNameParagraph.classList.add("friend-name");
        let friendNameText = document.createTextNode(friend.name);
        friendNameParagraph.appendChild(friendNameText);

        let secretFriendParagraph = document.createElement("p");
        secretFriendParagraph.classList.add("secret-friend");
        let secretFriendText;
        if (friend.secretFriend != -1 && 
			friend.secretFriend < friendsArray.length) {
            secretFriendText = document.createTextNode("➡" + friendsArray[friend.secretFriend].name);
        } else {
            secretFriendText = document.createTextNode("➡ por asignar");
        }
        secretFriendParagraph.appendChild(secretFriendText);
		
		let friendDeleteButton = document.createElement("button");
		friendDeleteButton.id = "del"+index;
		friendDeleteButton.classList.add("delete-button");
		let friendDeleteMessage = document.createTextNode("❌");
		friendDeleteButton.appendChild(friendDeleteMessage); 

		let friendUpdateButton = document.createElement("button");
		friendUpdateButton.id = "upd"+index;
		friendUpdateButton.classList.add("update-button");
		let friendUpdateMessage = document.createTextNode("💠");
		friendUpdateButton.appendChild(friendUpdateMessage); 
		
		let friendButtonsContainer = document.createElement("div");
		friendButtonsContainer.classList.add("friend-buttons");
		friendButtonsContainer.appendChild(friendUpdateButton);
		friendButtonsContainer.appendChild(friendDeleteButton);

        friendCard.appendChild(friendNameParagraph);
        friendCard.appendChild(secretFriendParagraph);
		friendCard.appendChild(friendButtonsContainer);

        newFriendsList.appendChild(friendCard);
    });
    friendsListContainer.appendChild(newFriendsList);
};

addButton.addEventListener("click", (e) => {
    overlay.classList.remove("overlay-going-away");
    overlay.classList.remove("overlay-hidden");
	newName.focus();
});

okButton.addEventListener("click", (e) => {
    e.preventDefault();
	newNameText = newName.value;
	if (newNameText != "") {
		if (isUpdate.value=="-1") {
			friends.push({ name: newName.value, secretFriend: -1 });
		} else {
			friends[parseInt(isUpdate.value)].name = newName.value
		}
		redrawList(friends);	
	}
    

    overlay.classList.add("overlay-going-away");
    newName.value = "";
	isUpdate.value="-1"
    setTimeout(() => {
        overlay.classList.add("overlay-hidden");
    }, 500);
});

calcButton.addEventListener("click", () => {
    calculateSecretFriend(friends);
});
/*
testButton.addEventListener("click", () => {
    redrawList(friends);
});
*/
friendsListContainer.addEventListener("click", event=>{
	if (event.target.id.slice(0,3) == "del") {
		index = parseInt(event.target.id.slice(3))
		console.log(friends[index]);
		friends.splice(index,1);
		friends.forEach(friend=>{friend.secretFriend = -1})
		redrawList(friends);
	}
	if (event.target.id.slice(0,3) == "upd") {
		isUpdate.value = event.target.id.slice(3);
		overlay.classList.remove("overlay-going-away");
    	overlay.classList.remove("overlay-hidden");
		newName.focus();
	}
})

redrawList(friends);
