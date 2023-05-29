//cred to https://kaiwern.com/posts/2022/02/12/writing-a-simple-firefox-extension/
//for inspiring me to try my hand 

var wordBtn;
var defBtn;
var cmtBtn;

const popUp = document.getElementById("popup-content");

const date = new Date().toDateString();
const datePhrase = "Today is " + date + "!";
document.getElementById("allContent").textContent = datePhrase;

const wordPairs = [
    ["ekphrastic", "type of poem that paints a scene", "usually used in writing or art, I think"],
    ["impedimenta", "bits and bobs that are kinda annoying to carry", "makes me think of the rock cycle for some reason"],
    ["syzygy", "when the earth, moon, and sun are all lined up", "how often do you get to see z's, y's and g's in a word? Pretty coollll..."],
    ["indistinguishability","the ability to be indistinguishable... same, same", "I feel like it varies based on what it is you are trying to distinguish"],
    ["torpor", "think groggy, muddy feeling", "I want to say I got this from the The Great Ace Attorney series, it gives off those vibes"],
    ["ancillary", "super important kinda backstage support to the system", "how I imagine you might describe the behind the scenes production of a show"],
    ["promulgates", "perpetuates, promotes, pushes through", "also fancy smancy legal talk for making laws come to pass"],
    ["balbis", "literally the mathematical name for the H shape", "You'd think they'd start the word with an H? Still, pretty cool, no?"], 
    ["lemniscate", "mathematical lines that form the infinity sign", "Pretty sure I learned of this word from the AI: The Somnium Files series..."],
    ["shan't", "the contraction for shall not", "I feel like there are tons of old contractions that we dont use nowadays because the words themselves were forgotten, hmm..."],
    ["pronk", "a leap, a jump, a hop, a skip", "It's a mode of transportation that just sounds so cool! Man, the deer were pronking all over the place..."],
    ["risible", "funny enough you just want to laugh because of it", "it's the kinda of thing that is a compliment if you were trying to be funny, less so if you were serious"],
    ["portentous", "could be either really showy or really foreboding", "Don't you ever wonder how dictionaries work.... Like it kinda assumes you have some inherent knowledge of some words, else if you kept tracing it back... you'd end up confused on what words like a or the meant..."],
    ["perspicacity", "ridiculous levels of being able to understand how things work" , "rhymes with audacity... as in the audacity of their perspicacity"],
    ["force majeure","a higher power, something that is over everyone equally on the playing field" ,"I'm going to treat this as a word, even though... technically it's more than one word, since it's the combination of words together that act as one... though if you really think about it, don't all words do that?"],
    ["temerity", "be bold! super confident", "I feel like this was a popular name back in the day, maybe I should research the history of names, but I'm pretty sure there was a time where popular names derived from cool qualities, right?"],
    ["thenceafter", "after which", "How often do we get cool smushed words like that nowadays, it's like a two for one deal!"],
    ["coup de foudre", "out of the blue, usually for love at first sight", "That makes me wonder, with loan words/phrases from other languages, like in this case from French, do you think they use the words in the same way? Surely there must be diverging histories and connatations with each version of the words, right? Gotta resarch..."],
    ["atomicity", "the num of atoms in the compound", "I want to say I heard this in chemistry... Chemistry, ah, chem...."],
    ["trichotomy", "three fold of things", "to be fair, if dichotomy implies a two fold decision, it makes sense there would be a three fold version... is there a one fold version or a four fold version?"],
    ["qua", "in the same way as", "You can use it in Scrabble... you're welcome!"],
    ["quiddle", "a waste of time, or someone who wastes time", "Such a fun word to say, ha"],
    ["methionyl­threonyl­threonyl­glutaminyl­alanyl­prolyl­threonyl­phenylalanyl­threonyl­glutaminyl­prolyl­leucyl­glutaminyl­seryl­valyl­valyl­valyl­leucyl­glutamyl­glycyl­seryl­threonyl­ala...", "the chemical name for titin", "The full thing is almost 2,000 letters long! Be honest with me chemists, do you guys actually use the full word? (you can tell me)"],
    ["casuistry", "really tricky resolutions that technically might not hold up", "Philosophy, always coming up with such fanciful schools of thought..."],
    ["sedulously", "you put in a lot of work, and that is good", "For some reason I thought this was one of thos latin terms you find in law, but I guess I was wrong"],
    ["happenstance", "coincidence, coinkydink", "See, what happened was...."],
    ["millwright", "a job of people who installed the machines within the factories", "Millwrights are still a thing, yes? Shoutout to all the millwrights reading this...."],
    ["scaramouch", "literally comes from an Italian trope for a comedic, cowardly character", "There should be more words named after tropes... though I guess tropes get their names from words so...."],
    ["churlish", "being rude/meanie", "I think this is cool because it contains 'hurl' within it that reminds me of rollercoaster loops...."],
    ["insouciantly", "happy and carefree", "sounds nice, I think everyone deserves to be insouciant"],
    ["malfeasance", "a wrongdoing", "Makes sense since typically the -mal prefix is associated with bad/wrong"],
    ["polyglossia", "a bunch of languages in one area", "Honestly, I don't remember where I learned this... maybe I developed an interest in linguistics someohw :O"],
    ["coruscate", "sparkly", "Why did I think this meant something about spiraling or shells.... also glitter"],
    ["quincunx", "5 objects in a specific order, one in center, other 4 at corners at square", "Man, geometric patterns are so interesting because of how mathematicians manage to describe them in equation forms which is really hard."],
    ["raison d'être", "a french phrase meaning the super important idea behind why something is the way it is", "It's mad important, you know, searching for that kind of reason.... also pretty sure I can't type this normally on my keyboard..."],
    ["soupçon", "very very small amount", "Yet another cool word I can't type normally on my keyboard..."],
    ["vuvuzela", "it's an instrument that loks kinda like a horn", "double v's and a z?! this word is amazing!"],
    ["fracas", "a general ruckus", "definitely gives me onomatopoeia vibes"],
    ["obsequious", "super obedient", "I wonder what the cool word for super unobedient is..."],
    ["adipocere", "wax that occurs when the body turns to soap...", "This is pretty important if you're doing stuff in the archaeological or funerary contexts..."],
    ["aplomb", "with ease, with pep in the step", "Sounds like a plum, so that's fun"],
    ["discombobulated", "confuzzled, mixed up", "Pretty sure I picked this up from the Professor Layton series... though I think I heard of it before then..."],
    ["octothorpe", "the real name of the # symbol", "Pretty sure this came from the Zero Escape series. Also, it's not pound or hashtag? Can you believe it :O"],
    ["morphogenetic", "genetic cells and how they morph and grow over time, as well as how they interact with the environment", "I don't even need to say what series this word is from... you already know :D"],
    ["tiff", "a small fit, a spat", "Isn't this like a nickname though? That's wild! What other nicknames are secretly words?"],
    ["pontificating", "when you go on and and on in a really obtuse, fancy pants manner", "feel like it could be a really good rhyming word "],
    ["ostensibly", "apparently, that's what they say", "Gives me 'Technically' vibes..."],
    ["orichalcum", "the alloy the Romans used for specific coins", "Reminds me of those names for colors"],
    ["balustrade", "it's the guardrail on a fancy balcony", "Pretty important, both story wise and in general"],
    ["exsanguination", "severe loss of blood", "It's time like this where I'm always surprised at the English language. There are always certain things we have a word for out of all the infinite concepts there are..."],
    ["lagomorph", "hares, rabbits, large rodents", "Technically omre than just hares and rabbits, which gets into the interesting animal species that often aren't popularly known"],
    ["milquetoast", "meh, boring, shy", "Makes me think of milk and toast... now that would be a strange combination"],
    ["hippotomonstrosesquippedaliophobia", "phobia of long words", "Okay, whoever is in charge of making new words decided to prank everyone with this phobia, they said you don't like big words? Here's a HUGE one!"],
    ["exult", "be super hyped, overjoyed", "not to be confused with exalt or exolt"],
    ["irascibility", "super easy to make angry/irritable", "don't be such a rascal or irascible for good measure"],
    ["tetractys", "poets say it's 5 line section, mathematicians say it's 10 dots shaped like a triangle", "this proves how the same word can derive different meanings depending upon which field it is utilized in..."],
    ["amorphous", "the opposite of morphous, lacking clear structure shape", "Makes me think of slime, jello, blobs, shapeshifting all that stuff...."],
    ["dilettante", "someone who only dabbles in a subject, an amateur, a poser", "Feels like two words smashed together..."],
    ["opprobrium", "shameful disgrace, something not to be proud of", "The -ium ending makes it feel like some kinda of chemical element or compound, yes?"],
    ["sui generis", "special, stand out, unique", "This is a Latin phrase, but it's used like a word, different from Latin phrases that are used like phrases... looking at you - carpe diem!"],
    ["inchoate", "in the baby stages of, just getting started", "probably another word that, once again, you do not want someone saying about you during a debate"],
    ["obduracy", "super stubborn in doing what you want, even when it's wrong", "Reminds me of the word 'obstinate' so maybe there's something to the ob- prefix?"],
    ["internecine", "conflict where everyone is losing", "I'm going to be honest, I forgot about the existence of this word until literally right now..."],
    ["impugning", "doubt, call into doubt", "How often do you get the silent -g of -gn outside of like reign and gnat? We need more gns in words"],
    ["honorificabilitudinity", "you have the power to become honorable", "This word feels like it is figuring out how it wants to end as it goes along and I feel that."],
    ["slake", "quashes the power of thirst", "Sadly, I feel like quench always overshadows it... it's okay, slake, I know you exist..."],
    ["brumation", "hibernation, but only if you are cold-blooded", "Makes sense if you think about it, you don't really see the cold-blooded animals in the winter..."],
    ["estivation", "a kind of hibernation that animals do in the summer/very hot times", "The summer version of brumation... and here everyone thought there was only hibernation...."],
    ["farcical", "seems like it's ridiculous, to the point of being a farce", "Yes, it's from the same word as farce, which I know is very popular..."],
    ["weft", "the threads on the loom that go up and down", "Ok, what about warp though? Warp and weft are like two peas in a pod."],
    ["synchronicity", "when things happen at the exact same instant and it's kinda wild", "Think clocks and lots of measurement and heavy physics because in real life this can be really hard to achieve."],
    ["backronym", "when you make an acronym but start by making the acronym first and then fitting the phrase to the letters accordingly", "How many acronyms are actually backronyms if you think about it?"],
    ["eschewing", "skipping out on,  avoiding", "Usually not a good thing, no?"],
    ["magnocellular", "Type of super big neurons", "There are times where I learn a word and I understand perfectly where I might use it in everyday speech... this is not one of those times...."],
    ["tachistoscope", "Device/instrument that shows pictures for a super limited time", "You can always know if something is a fancy scientific instrument because it ends in a -scope"],
    ["lackadaisical", "carefree in a not necessarily good way", "I feel like this word was on Word Girl! once...."],
    ["penultimate", "not last, but second to last", "Kinda cool, there are words not just for last place, but second to last place... wonder what the word for third to last is..."],
    ["vexatious", "causing frustration, vexing", "It's vexing when you're vexatious, man"],
    ["involute", "super complicated", "Super mega ultra extremely really incredibly gargantuan complicated..."],
    ["zymolytic", "has to do with fermenting stuff", "It's not to often you get z's in words... you got to appreciate the z's when you see them..."],
    ["ichthyologist", "scientist who studies fish/fishology", "I don't think fishology is a word, but it sounds cool... I wonder how this field relates to marine biology?"],
    ["ingress", "entrance/act of entrance", "Opposite of egress"],
    ["egress", "exit/act of exiting", "Opposite of ingress"],
    ["congealed", "cooled down, jellolike into solid", "Usually not good if it's food, maybe if it's jello or slime though..."],
    ["multitenancy", "computer term for multiple instances being active in the same computer at the same time", "It kinda implies the metaphor that applications are like tenants in an apartment? Fascinating..."],
    ["ad hoc", "like only in this case", "Gives on a need to know basis... like spy movies :O"],
    ["performant", "does really well", "Why don't you just say someone who performs well?"],
    ["defenestration", "when you throw someone out of a window", "How many times did this happen in history before someone in the olden times was like... hmmm, we should have a word for that?!"],
    ["whelk", "a type of sea snail", "You think it's cousins with the immortal snail?"],
    ["understandable", "makes sense", "Sometimes you just need a good word, and that's understandable..."],
    ["pneumonoultramicroscopicsilicovolcanoconiosis", "A lung disease because of dust and ash", "One of the classics!"],
    ["concours", "A competition, but like applying in the adjective sense", "Kinda has the same vibe as calling a card vintage"],
    ["plumbiferous", "means you have lead", "Not going to lie, thought this wasn't a real word for a good while... Also makes sense if you realize lead is Pb"],
    ["amortization", "when you pay your debt over a long time, but you're always paying the same thing", "Oh no... why in the world did I learn this one?! :("],
    ["brusque", "pretty blunt and quick", "Not to be confused with brutish or brutal..."],
    ["scion", "the next in line for really important families", "I don't know why, but I really like this word"],
    ["impetus", "the power behind which something is propelled", "Reminds me of impel and expel, all physics-based movement type words..."],
    ["reneged", "to go back on, to say no in retrospect", "I wonder if this word is in any way linked to renegade?"],
    ["periphery", "like the very, very edge...", "The frontier.... they say the final unexplored frontier is deep under the ocean... but go fish..."],
    ["ruggedized", "super rugged and resistant", "Feels like the kinda word meant for a seal or stamp"],
    ["columnar", "in a column shape", "Man, I remember back in the ye old days, to describe vertical and horizontal we just said hotdogs and hamburgers..."],
    ["callow", "little experience", "Feels like it would be a fantasy character's last name or something..."],
    ["impute", "associated with, attributed to", "Usually used in the negative sense, I feel"],
    ["supercalifragilisticexpialidocious", "super super super wonderful", "Go watch/listen to the song!"],
    ["chrysanthemum", "a type of flower", "What's your favorite type of flower? Go find it now... there are some wild types out there"],
    ["prognosticator", "someone who tells what's going to happen in the future", "So like a diagnosticater but of the futureeee..."],
    ["wacky", "strange, cool", "It's just a little bit wacky..."],
    ["despair", "desperation, sadness", "I don't even need to say the game series name. This word and hope....over and over.... you'd know those words like the back of your hand by the end of it :)"],
    ["thanatoaesthetics", "the necessary cosmetology for funerals", "looks like Thanos + aesthetics -> so lots of purple and jewelry then?"],
    ["Aequeosalinocalcalinoceraceoaluminosocupreovitriolic", "literally a word made to talk about these one bath places", "Pretty sure I saw a cool mat4yo video with this word a long while back..."],
    ["hircine", "goat-like", "Baby goats are called kids, you know!"],
    ["fecundity", "fertile, can produce a lot of new things, both ideas or offspring", "Feels like it would be hard to pronounce, but isn't"],
    ["abjuration", "rebuking, relinquishing, or in any other way recanting an oath", "The -ation suffix gives fantasy vibes..."],
    ["percipient", "aware, super perceptive", "Both have that percep- part... also similar to percieving..."],
    ["cowl", "a hood, though it can come in many forms", "I'm Batmannnn...."],
    ["fiduciary", "important duty/trust specially in the financial sense", "Wonder if this has anything to do with the Roman words for money..."],
    ["high dudgeon", "means someone is super mad / furious", "A phrase that's treated like a word once again"],
    ["skeumorphic", "where an item that is being designed will look like the equivalent in the modern world", "Like did you ever think why the save button always has to look like a floppy disk always, even though we don't really save on floppy disks anymore?"],
    ["impel", "push forward to do", "Gives same vibes as implore"],
    ["expunge", "remove from the record", "Usually referring to the legal sense, though people use the word casually once in a while"],
    ["malaise", "a kinda of illness where you're just generally discomforted/melancholy", "Feels like something you'd read about in a famous literary work"],
    ["apothegm", "a proverb, saying", "It's really cool, how often do you get a -gm in a word?"],
    ["nostradamus", "predictor of the future, usually a Cassandra type figure", "Apparently this was based on actual French guy, Nostredame of lore..."],
    ["finangling","hacking, shimmying your way into something","One of those words that is fun to say..."],
    ["frustum","the bottom part of a pyramid/cone","Wonder who comes up with these terms... I want to invent one in the future one day..."],
    ["transpiling","taking code from one language into another","Programmers, coders, users of code, lend me your ears - what programming languages do you like?"],
    ["serendipitous","extremely lucky, coincidently","Apparently built upon a story..."],
    ["extemporaneousnesss","the state of being extemporaneous","You know I just had to put this one here :D This was the first word I ever had in my cool word list..."],
    ["sycophantic","in a manner that is really obedient but for an insincere reason","I think this is the same as obsequious so that's cool"]
]


const oneSec = 1000
const oneMin = 60 * oneSec
const oneHour = 60 * oneMin
const oneDay = 24 * oneHour


// n refers to the chosen num for day 
// n changes based on date
var n = Math.floor(Date.now() / oneDay) % wordPairs.length;

const currentWord = wordPairs[n][0];
const currentDef = wordPairs[n][1];
const currentCmt = wordPairs[n][2];


function reset(){
    wordBtn.textContent = "Word Of The Day"
    defBtn.textContent = "Definition Of The Day"
    cmtBtn.textContent = "Comments On The Word"
    document.getElementById("allContent").textContent = datePhrase;
}

function toggle(event){
    var clickedId = event.target.id;
    console.log(event.target.textContent);
    
    if(clickedId == "wordBtn"){
        if (wordBtn.textContent == "Word Of The Day"){
            wordBtn.textContent = "Back To Date"
            document.getElementById("allContent").textContent = currentWord;
        }
        else{
            reset();
        }
    }else if (clickedId == "defBtn"){
        if (defBtn.textContent == "Definition Of The Day"){
            defBtn.textContent = "Back To Date"
            document.getElementById("allContent").textContent = currentDef;
        }
        else{
            reset();
        }
    }else if (clickedId == "cmtBtn"){
        if (cmtBtn.textContent == "Comments On The Word"){
            cmtBtn.textContent = "Back To Date"
            document.getElementById("allContent").textContent = currentCmt;
        }
        else{
            reset();
        }
    }else{
        return;
    }
}

document.addEventListener("DOMContentLoaded", function addListeners() {
    wordBtn = document.getElementById("wordBtn");
    defBtn = document.getElementById("defBtn");
    cmtBtn = document.getElementById("cmtBtn");

    popUp.addEventListener("click", (event) => toggle(event));
    
})
