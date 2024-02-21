import React  from 'react'

const seconds_per_game:number = 60 * 12 * 4
const seconds_per_period:number = seconds_per_game / 4

const RotationToolTip = React.forwardRef<HTMLDivElement, {
    time:number
  }>(function RotationToolTip(props, ref) {
  const {time} = props

  return (
    <div className='tooltip' ref={ref} >
      {toolTipStamp(time)}
    </div>
  );
});

const toolTipStamp = (time: number,) => {
    const gameTimeStamp = (i:number) => {
      if (i < 0 || i >= seconds_per_game ){
        return 'ERROR'
      }
    
      const quarters_passed = Math.floor(i/seconds_per_period)
      const time_intermediate = seconds_per_period - (i % seconds_per_period)
      const timeStamp = `${Math.floor(time_intermediate / 60).toString().padStart(2,'0')}:${(time_intermediate % 60).toString().padStart(2,'0')}`
      const qtr_dict = ['1st Qtr','2nd QTR','3rd QTR','4th QTR','END OF GAME']
    
      return `${qtr_dict[quarters_passed]} ${timeStamp}` 
    
    }
  
    return `${gameTimeStamp(time)}`
  }

export default RotationToolTip
