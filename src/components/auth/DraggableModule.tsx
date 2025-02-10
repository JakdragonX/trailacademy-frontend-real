import { useState } from 'react'
import { Card, CardContent } from "@/src/components/shared/ui/card"
import { DragHandleDots2Icon } from '@radix-ui/react-icons'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import { CheckCircle2, XCircle, Book, Video, Calendar, GripVertical, Eye } from 'lucide-react'

export function DraggableModule({ module, index, onMoveModule }) {
  const [showQuiz, setShowQuiz] = useState(false)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [showExplanations, setShowExplanations] = useState({})

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
    setShowExplanations(prev => ({
      ...prev,
      [questionId]: true
    }))
  }

  const getAnswerStyle = (questionId, answerIndex) => {
    if (!showExplanations[questionId]) return "bg-white"
    
    const isSelected = selectedAnswers[questionId] === answerIndex
    const isCorrect = module.quiz.questions[questionId].correct === answerIndex
    
    if (isSelected && isCorrect) return "bg-green-100 border-green-500"
    if (isSelected && !isCorrect) return "bg-red-100 border-red-500"
    if (!isSelected && isCorrect && showExplanations[questionId]) 
      return "bg-green-50 border-green-500"
    
    return "bg-white"
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative"
    >
      <Card className="border-2 border-[#2D4F1E] hover:shadow-lg transition-all">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-[#2D4F1E]">
              {module.title}
            </h3>
            <div className="flex items-center gap-2">
              <button 
                className="p-2 hover:bg-[#FAF6F1] rounded-full transition-colors"
                onClick={() => onMoveModule(index, 'up')}
              >
                ↑
              </button>
              <button 
                className="p-2 hover:bg-[#FAF6F1] rounded-full transition-colors"
                onClick={() => onMoveModule(index, 'down')}
              >
                ↓
              </button>
              <DragHandleDots2Icon className="h-6 w-6 text-[#2D4F1E] cursor-move" />
            </div>
          </div>

          <p className="text-gray-600 mb-4">{module.description}</p>

          <div className="grid grid-cols-2 gap-4">
            {/* Content sections */}
            <div className="space-y-4">
              <div className="bg-[#FAF6F1] p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Book className="text-[#2D4F1E]" />
                  <h4 className="font-medium">Readings</h4>
                </div>
                {module.content.readings.map((reading, i) => (
                  <div key={i} className="flex justify-between items-center py-2">
                    <span>{reading.title}</span>
                    <span className="text-sm text-gray-600">{reading.pages}</span>
                  </div>
                ))}
              </div>

              <div className="bg-[#FAF6F1] p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Video className="text-[#2D4F1E]" />
                  <h4 className="font-medium">Videos</h4>
                </div>
                {module.content.videos.map((video, i) => (
                  <div key={i} className="flex justify-between items-center py-2">
                    <span>{video.title}</span>
                    <span className="text-sm text-gray-600">{video.duration}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quiz section */}
            <div>
              <button
                onClick={() => setShowQuiz(!showQuiz)}
                className="w-full bg-[#2D4F1E] text-white px-4 py-2 rounded-lg hover:bg-[#1F3614] transition-colors mb-4"
              >
                {showQuiz ? 'Hide Quiz' : 'Show Quiz'}
              </button>

              <AnimatePresence>
                {showQuiz && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    {module.quiz.questions.map((question, qIndex) => (
                      <div key={qIndex} className="bg-[#FAF6F1] p-4 rounded-lg">
                        <p className="font-medium mb-3">{question.question}</p>
                        <div className="space-y-2">
                          {question.options.map((option, oIndex) => (
                            <button
                              key={oIndex}
                              onClick={() => handleAnswerSelect(qIndex, oIndex)}
                              className={`w-full text-left p-3 rounded border-2 transition-colors ${
                                getAnswerStyle(qIndex, oIndex)
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span>{option}</span>
                                {showExplanations[qIndex] && selectedAnswers[qIndex] === oIndex && (
                                  question.correct === oIndex 
                                    ? <CheckCircle2 className="text-green-500" />
                                    : <XCircle className="text-red-500" />
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                        {showExplanations[qIndex] && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-3 p-3 bg-white rounded"
                          >
                            <p className="text-sm text-gray-600">{question.explanation}</p>
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}










