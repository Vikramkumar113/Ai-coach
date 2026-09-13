"use client"

import React, { useEffect, useState } from 'react'
import useFetch from '@/hooks/use-fetch';
import { generateQuizQuestions, saveQuizResult } from '@/actions/interview';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { BarLoader } from 'react-spinners';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';
import QuizResult from './quiz-result';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] =  useState(false);

  
  const {
    loading: generatingQuiz,
    fn: generateQuestionsFn,
    data: quizData,
  } = useFetch(generateQuizQuestions);

  const {
    loading: savingResult,
    fn: saveQuizResultFn,
    data: resultData,
    setData: setResultData,
  } = useFetch(saveQuizResult);



  useEffect(()=>{
    if(quizData){
       setAnswers(new Array(quizData.length).fill(null))
    }
  },[quizData])

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === quizData[index].correctAnswer) {
        correct++;
      }
    });
    return (correct / quizData.length) * 100;
  };


  const finishQuiz = async () => {
    const score = calculateScore();
    try {
      await saveQuizResultFn(quizData, answers, score);
      toast.success("Quiz completed!");
    } catch (error) {
      toast.error(error.message || "Failed to save quiz results");
    }
  };

  const startNewQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowExplanation(false);
    generateQuestionsFn();
    setResultData(null);
  }

  if(generatingQuiz){
    return <BarLoader className='mt-4' width={"100%"} color='grey' />;
  }

  if(resultData){
    return (
      <div className='mx-2'>
        <QuizResult result={resultData} onStartNew={startNewQuiz} />
      </div>
    )
  }


  if(!quizData){
    return (
      <Card className="mx-2">
        <CardHeader>
          <CardTitle>Ready to test your knowledge?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This quiz contains 10 questions specific to your industry and
            skills. Take your time and choose the best answer for each question.
          </p>
        </CardContent>
        <CardFooter>
          <Button  className="w-full" onClick={generateQuestionsFn}>
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    )
  }

  const question = quizData[currentQuestion];

  return (
    <Card className="mx-2">
        <CardHeader>
          <CardTitle>
            Question {currentQuestion + 1} of {quizData.length}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-lg font-medium'>{question?.question}</p>

          <RadioGroup
            onValueChange={handleAnswer}
            value={answers[currentQuestion]}
            className="space-y-3 mt-4"
          >
            {question?.options?.map((option, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 p-3.5 rounded-lg border transition-all cursor-pointer ${
                  answers[currentQuestion] === option
                    ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary"
                    : "border-border hover:border-primary/50 hover:bg-muted/40 text-foreground"
                }`}
                onClick={() => handleAnswer(option)}
              >
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="cursor-pointer flex-1 text-base font-normal leading-relaxed">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>

        {showExplanation && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="font-medium">Explanation:</p>
            <p className="text-muted-foreground">{question?.explanation}</p>
          </div>
        )}
        </CardContent>
        <CardFooter>
        {!showExplanation && (
          <Button
            onClick={() => setShowExplanation(true)}
            variant="outline"
            disabled={!answers[currentQuestion]}
          >
            Show Explanation
          </Button>
        )}

        <Button
          onClick={handleNext}
          disabled={!answers[currentQuestion] || savingResult}
          className="ml-auto"
        >
          {savingResult && (
            <BarLoader className="mt-4" width={"100%"} color="gray" />
          )}
          {currentQuestion < quizData.length - 1
            ? "Next Question"
            : "Finish Quiz"}
        </Button>
        </CardFooter>
      </Card>
  )
}

export default Quiz
