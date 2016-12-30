export default class QuestionModel {
    constructor() {
        this.text = "";
        this.type = "MULTICHOICE";
        this.answers = [
            { text: "", correct: true },
            { text: "", correct: false },
            { text: "", correct: false },
            { text: "", correct: false }
        ];
        this.hint = false;
        this.correctToProceed = false;
        this.feedback = "";
    }
}