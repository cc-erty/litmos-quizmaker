<template>
	<div id="quizmaker">
		<h1>Litmos Quizmaker</h1>
		<div class="row">
			<div class="col-xs-2">
				<div class="fixed">
					<p
						v-for="(q, index) of questions"
					>
						<a :href="'#' + index">
							{{q.text.length ? q.text.length > 20 ? q.text.substr(0, 20) + "..." : q.text : 'Empty Question'}}
						</a>
						<button
							class="btn btn-default"
							@click="() => deleteQuestion(index)"
						>
							<span class="glyphicon glyphicon-trash"></span>
						</button>
					</p>
					<p>
						<button class="btn btn-default" @click="addQuestion">+</button>
						<button class="btn btn-default" @click="exportCSV">Export</button>
					</p>
				</div>
			</div>
			<div class="col-xs-10">
				<question
					v-for="(q, index) of questions"
					:index="index"
					:question="q"
				></question>
				<button class="btn btn-default" @click="addQuestion">Add Question</button>
			</div>
		</div>
	</div>
</template>

<script>
import question from './Question.vue';

import QuestionModel from '../QuestionModel.js';

export default {
	name: 'hello',
	data() {
		return {
			questions: [new QuestionModel()]
		}
	},
	methods: {
		addQuestion() {
			this.questions.push(new QuestionModel());
		},
		deleteQuestion(i) {
			if (confirm("Really Delete?")) {
				this.questions.splice(i, 1);
			}
		},
		exportCSV() {
			const exportQuestions = this.questions.map(q => {
				const qOut = [
					`"${q.text}"`,
					q.type,
				];

				for (let i = 0; i < 10; i++) {
					if (q.answers[i]) {
						qOut.push(`"${q.answers[i].text}"` || "");
						qOut.push(q.answers[i].correct ? `"TRUE"` : `"FALSE"`);
					} else{
						qOut.push(`""`);
						qOut.push(`""`);
					}
				}

				qOut.push(q.hint ? `"TRUE"` : `"FALSE"`);
				qOut.push(q.CorrectToProceed ? `"TRUE"` : `"FALSE"`);
				qOut.push(`"${q.feedback}"`);
				return qOut;
			});
			const tooManyQuotes = Papa.unparse({
				fields: [
					"QuestionText",
					"QuestionType",
					"Answer1",
					"IsAnswer1Correct",
					"Answer2",
					"IsAnswer2Correct",
					"Answer3",
					"IsAnswer3Correct",
					"Answer4",
					"IsAnswer4Correct",
					"Answer5",
					"IsAnswer5Correct",
					"Answer6",
					"IsAnswer6Correct",
					"Answer7",
					"IsAnswer7Correct",
					"Answer8",
					"IsAnswer8Correct",
					"Answer9",
					"IsAnswer9Correct",
					"Answer10",
					"IsAnswer10Correct",
					"ShowAnswerHint",
					"CorrectToProceed",
					"ShowFeedback"
				],
				data: exportQuestions
			}, {quotes: false});
			const outputCSV = tooManyQuotes.replace(/"""/g, "\"");
			var blob = new Blob([outputCSV], { type: "text/csv" });
			window.saveAs(blob, "quiz.csv")
		}
	},
	components: {
		question
	}
}
</script>

<style scoped>
	.fixed { 
		position: fixed;
		margin-left: 20px;
	}
</style>
