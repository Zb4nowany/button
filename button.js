document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});

const button = document.getElementById('button');
const buttonContainer = document.getElementById('buttonContainer');
const buttonHitbox = document.getElementById('buttonHitbox');
const hitColor = document.getElementById('hitColor');
let buttonClicked = false;

let count = 0;
const playerHint = document.getElementById("playerHint");
const clicksCounter = document.getElementById('clicksCounter');
const startingMessages = [
    "Clicked!",
    "Double Click",
    "Triple Click",
    "Clicking Monster!",
	"PENTACLICK",
	"Clicking Machine!",
	"Clicking Sensei!",
	"Autoclicker!",
	"Spamclicker!",
];
const ouchMessage = "*ouch*";
const ouchMessageCount = 10;
const madMessage = ">:(";
const madMessageCount = 22;
const winMessages = [
	"okay...",
	"you win",
	"I'm not mad",
	"for now...",
	"but please",
	"be gentle",
	"Click me",
];
let mad = 0;
let shakeRange = 0;
let shakeInterval = 0;
let shake;

buttonHitbox.addEventListener('mouseenter', () => {                                                   // HOVER
    button.style.backgroundColor = '#FF8533';
	button.style.boxShadow = '0px 42px 0px 0px #db620f';
	button.style.transition = 'box-shadow 0s';
	button.style.textShadow = '0px 12px 0px rgba(0, 0, 0, 0.4)';
});

buttonHitbox.addEventListener('mouseleave', () => {                                                     // UNHOVER
    button.style.backgroundColor = '#ff6600';
	button.style.boxShadow = '0px 42px 0px 0px #c34f00';
	button.style.textShadow = '0px 12px 0px rgba(0, 0, 0, 0.6)';
    buttonContainer.style.paddingTop = '0px';
	buttonContainer.style.transition = 'padding-top 0.07s';
	buttonHitbox.style.paddingBottom = '42px';
	buttonHitbox.style.transition = 'padding-bottom 0.07s';
	if (mad != 0 && !shake) {
		shake = setInterval (() => {
			buttonContainer.style.transform = 'translate(' +
				Math.floor(Math.random() * shakeRange * 2 - shakeRange) + 'px, ' +
				Math.floor(Math.random() * shakeRange) + 'px)';
		}, shakeInterval);
	};
	buttonClicked = false;
});

buttonHitbox.addEventListener('mousedown', () => {                         // CLICK
	button.style.boxShadow = '0px 18px 0px 0px #db620f';
	button.style.transition = 'box-shadow 0.07s';
    buttonContainer.style.paddingTop = '24px';
	buttonContainer.style.transition = 'padding-top 0.07s';
	buttonHitbox.style.paddingBottom = '18px';
	buttonHitbox.style.transition = 'padding-bottom 0.07s';
	if (shake) {
		clearInterval(shake);
	};
	buttonClicked = true;

});

buttonHitbox.addEventListener('mouseup', () => {                              // UNCLICK
	if (buttonClicked === true) {
		button.style.boxShadow = '0px 42px 0px 0px #db620f';
		button.style.transition = 'box-shadow 0.07s';
		buttonContainer.style.paddingTop = '0px';
		buttonContainer.style.transition = 'padding-top 0.07s';
		buttonHitbox.style.paddingBottom = '42px';
		buttonHitbox.style.transition = 'padding-bottom 0.07s';
		
		if (count < startingMessages.length) {
			button.innerHTML = `<b>${startingMessages[count]}</b>`;
			if (count === 0) {
				playerHint.style.visibility = 'hidden';
			}
			buttonClicked = false;
		};
		if (count - startingMessages.length < ouchMessageCount && buttonClicked === true) {
			button.innerHTML = `<b>${ouchMessage}</b>`;
			hitColor.style.backgroundColor = 'rgba(139, 0, 0, 0.2)';
			hitColor.style.transition = 'none';
			setTimeout (() => {
				hitColor.style.transition = 'background-color 0.1s'; // Enable transition for fade
				hitColor.style.backgroundColor = 'rgba(139, 0, 0, 0)';
			}, 0);
			buttonClicked = false;
		};
		if (count - startingMessages.length - ouchMessageCount < madMessageCount && buttonClicked === true) {
			button.innerHTML = `<b>${madMessage}</b>`;
			hitColor.style.backgroundColor = 'rgba(139, 0, 0, 0.2)';
			hitColor.style.transition = 'none';
			setTimeout (() => {
				hitColor.style.transition = 'background-color 0.1s'; // Enable transition for fade
				hitColor.style.backgroundColor = 'rgba(139, 0, 0, 0)';
			}, 0);
			mad++;
			if (shake) {
				clearInterval(shake);
			};
			shakeRange += 50 / 3 / mad;
			shakeInterval = 0.1 / mad;
			
			shake = setInterval (() => {
				buttonContainer.style.transform = 'translate(' +
					Math.floor(Math.random() * shakeRange * 2 - shakeRange) + 'px, ' +
					Math.floor(Math.random() * shakeRange) + 'px)';
			}, shakeInterval);
			
			buttonClicked = false;
		};
		if (count - startingMessages.length - ouchMessageCount - madMessageCount < winMessages.length && buttonClicked === true) {
			if (shake) {
				clearInterval(shake);
			};
			buttonContainer.style.transform = 'translate(0px, 0px)';
			button.innerHTML = `<b>${winMessages[count - startingMessages.length - ouchMessageCount - madMessageCount]}</b>`;
			buttonClicked = false;
		};
		clicksCounter.innerHTML = 'Clicks: ' + ++count;
		

	};
});



setTimeout(() => {
    if (count == 0) {
        playerHint.style.color = 'rgba(70, 70, 70, 1)';
		playerHint.style.transition = 'color 1s';
    }
}, 5000);

