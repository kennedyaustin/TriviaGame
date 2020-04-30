$(document).ready(function() {

var trivia = {
    Correct: 0,
    Incorrect: 0,
    Unanswered: 0,
    currentSet: 0,
    timer: 15,
    timerOn: false,
    timerId : '',

    Questions: {
        q1: 'How many blocks of gold were used to craft the enchanted golden apple in the past?',
        q2: 'What resource isn\'t used when constructing the pyramid for a beacon?',
        q3: 'How much iron is needed to craft an anvil?',
        q4: 'How many bookshelves are needed to make a level 30 enchantment?',
        q5: 'What can you use to make a turtle follow you?',
        q6: 'What version of Minecraft were bees added to the game?',
        q7: 'What hostile mob can be used to get the heads of other mobs?',
        q8: 'What kind of pickaxe do you need to mine and collects obsidian?',
        q9: 'What hostile mob drops the Totem of Undying item?',
        q10: 'How much experience do you get from killing a respawned Enderdragon?'
    },

    PossibleAnswers: {
        q1: ['8', '9', '5', '4'],
        q2: ['Diamond', 'Iron', 'Emerald', 'Coal'],
        q3: ['29', '31', '25', '33'],
        q4: ['15', '20', '19', '25'],
        q5: ['Seagrass', 'Kelp', 'Sugarcane', 'Grass'],
        q6: ['1.09', '1.11', '1.15', '1.16'],
        q7: ['Wither', 'Charged Creeper', 'Zombie', 'Enderman'],
        q8: ['Stone', 'Iron', 'Gold', 'Diamond'],
        q9: ['Evoker', 'Blaze', 'Pillager', 'Witch'],
        q10: ['12,000', '5,000', '2,000', '500']
    }

});