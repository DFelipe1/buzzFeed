import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json'

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [
    NgIf,
    NgFor
  ],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent {
  title: string = 'Quizz';

  questions: any
  quentionSelected: any

  answers: string[] = []
  answerSelected: string = ''

  questionIndex: number = 0
  questionMaxIndex: number = 0

  finished: boolean = false

  ngOnInit(): void {
    if(quizz_questions){
      this.finished = false;
      this.title = quizz_questions.title
      
      this.questions = quizz_questions.questions
      this.quentionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length
      
      console.log(this.questionIndex)
      console.log(this.questionMaxIndex)
    }
  }

  playerChoose(value:string) {
    this.answers.push(value)
    this.nextStep()
  }

  async nextStep() {
    this.questionIndex += 1

    if(this.questionMaxIndex > this.questionIndex) {
      this.quentionSelected = this.questions[this.questionIndex]
    } else {
      const finalAnswer = await this.CheckeResult(this.answers)
      this.finished = true
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]

    }
  }

  async CheckeResult(answers:string[]) {
    const result = answers.reduce((previous, current, i , arr) => {
      if( 
        arr.filter(item => item === previous).length > 
        arr.filter(item => item === current).length
      ){
        return previous
      }else {
        return current
      }
    })

    return result
  }

}
