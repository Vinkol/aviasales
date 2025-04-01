import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import cl from './ProgressBar.module.sass'
import { Progress } from 'antd'

const ProgressBar = () => {
  const countPack = useSelector((state) => state.ticketListReducer.countPack)

  const progress = countPack * 5

  useEffect(() => {
    console.log('CountPack: ', countPack)
    console.log('Progress: ', progress)
  }, [countPack, progress])

  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    if (progress >= 100) {
      setIsShow(true)
    }
  }, [progress])

  return (
    <Progress
      className={`${cl['progress-bar']} ${isShow ? cl['visually-hidden'] : ''}`}
      percent={progress}
      status={progress === 100 ? 'success' : 'active'}
      showInfo={false}
    />
  )
}

export default ProgressBar
