'use strict';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');

const app = new App();

app.use(
    new Alexa(),
    new GoogleAssistant(),
    new JovoDebugger(),
    new FileDb()
);


// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler({
    LAUNCH() {
        this.$speech.addText('Welcome to your smart lock. Would you like to lock your door? Check the status of your door? Or unlock your door?')
        this.$reprompt.addText('Please say lock your door, status of my door, or unlock to control your door.')
        this.ask(this.$speech, this.$reprompt);
    },

    LockIntent() {
        let expectedLockPrompt = 'Your door is locked'
        let expectedUnlockPrompt = 'Your door is unlocked'
        let lockStatus = this.$inputs.lockStatus.value
        if(lockStatus === 'lock') {
            this.$speech.addText(expectedLockPrompt)
        } else {
            this.$speech.addText(expectedUnlockPrompt)
        }
        this.tell(this.$speech);
    },

    MyNameIsIntent() {
        this.tell('Hey ' + this.$inputs.name.value + ', nice to meet you!');
    },
});

module.exports.app = app;
