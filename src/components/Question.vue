<template>
	<div class="question">
		<a v-bind:name="index"></a>
		<div class="row">
			<div class="col-xs-6">
				Text (HTML):
				<button
					class="btn btn-default"
					@click="() => {question.text = encodeHtml(question.text)}"
				>Encode</button>
				<button
					class="btn btn-default"
					@click="() => {question.text = encodeHtml(encodeHtml(question.text))}"
				>Double Encode</button>
				<textarea
					class="form-control"
					v-model="question.text"
					placeholder="Question Text"
				></textarea>
				Type: <select class="form-control" v-model="question.type">
					<option value="MULTICHOICE">Multiple Choice</option>
					<option value="KEYWORD">Keyword</option>
					<option value="FREETEXT">Free Text</option>
				</select>
				<p><label>Show Hint<br><input type="checkbox" v-model="question.hint" placeholder="Question Hint"></label></p>
				<p><label>Correct to Proceed<br><input type="checkbox" v-model="question.correctToProceed" ></label></p>
				<div v-if="question.type !== 'FREETEXT'">
					Feedback: <textarea class="form-control" v-model="question.feedback" placeholder="Feedback if answered incorrectly"></textarea>
				</div>
			</div>
			<div class="answers col-xs-6" v-if="question.type === 'FREETEXT'">Answer will be hand-graded when the student submits it.</div>
			<div class="answers col-xs-6" v-if="question.type !== 'FREETEXT'">
				Answers:
				<p class="text-warning" v-if="question.type === 'KEYWORD'">HTML does not work in keyword answers</p>
				<div
					v-for="(a, index) of question.answers"
					class="answer"
				>
					<button
						class="btn btn-default btn-right"
						@click="question.answers.splice(index, 1)"
					>Delete</button>
					<span class="answer__number">{{index + 1}}</span>
					<span v-if="question.type === 'MULTICHOICE'">
						Correct: <input type="checkbox" v-model="a.correct">
						<button
							class="btn btn-default"
							@click="() => {a.text = encodeHtml(a.text)}"
						>Encode</button>
					</span>
					<textarea
						class="form-control"
						type="text"
						v-model="a.text"
						placeholder="Answer Text"
					></textarea>
				</div>
				<button
					class="btn btn-default"
					@click="question.answers.push({text: '', correct: false})"
					>Add Answer</button>
			</div>
			<div class="rendered col-xs-12">
				<div class="row">
					<div class="col-xs-6">
						<h3>Question</h3>
						<div class="rendered__question"
							v-html="renderQuestion()"
						></div>
						<div v-if="question.type !== 'FREETEXT'">
							<h3 v-if="question.feedback">Feedback</h3>
							<div class="rendered__feedback"
								v-if="question.feedback"
								v-html="renderFeedback()"
							></div>
						</div>
					</div>
					<div class="col-xs-6">
						<h3>Answers:</h3>
						<div class="rendered__answers">
							<div
								v-if="question.type === 'MULTICHOICE'"
								class="rendered__answer"
								v-for="a of question.answers"
							>
								<div v-html="renderAnswer(a)"></div>
							</div>
							<div
								v-if="question.type === 'KEYWORD'"
								class="rendered__answer"
								v-for="a of question.answers"
							>
								<div v-html="a.text"></div>
							</div>
							
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'question',
	props: ['question', 'index'],
	methods: {
		renderQuestion() {
			return this.decodeHtml(this.question.text);
		},
		renderAnswer(a) {
			return `<input type="checkbox" ${a.correct ? 'checked="checked"' : ''} disabled="disabled"> ` + a.text;
		},
		renderFeedback() {
			return this.question.feedback;
		},
		decodeHtml(html) {
			return html.replace(/&lt;/ig, '<').replace(/&gt;/ig, '>').replace(/&amp;/gi, '&');
		},
		encodeHtml(value) {
			return document.createElement( 'a' ).appendChild( document.createTextNode( value ) ).parentNode.innerHTML;
		}
	}
}
</script>

<style scoped>
	.question {
		border: 1px solid #ccc;
		padding: 2rem;
		margin-top: 2rem;
	}
	.question:first-child {
		margin-top: 0;
	}
	
	textarea.form-control {
		height: 60px;
		font-family: consolas;
	}

	.rendered {
		border-top: 1px solid #ccc;
		margin-top: 2rem;
	}
	.rendered__question, .rendered__answers, .rendered__feedback {
		margin: 0 auto;
		border: 1px solid #ccc;
		padding: 1rem;
	}
	.rendered__answer {
		text-align: left;
		padding-top: 2rem;
	}
	.rendered__answer:first-child {
		padding-top: 0rem;
	}

	.answer {
		margin-top: 1rem;
		text-align: left;
	}

	.answer:first-child{
		margin-top: 0;
	}

	.answer__number {
		font-weight: bold;
	}
	.answer__number::after {
		content: "."
	}

	.btn-right {
		float: right;
	}
</style>
