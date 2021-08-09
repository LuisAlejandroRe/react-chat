import { forwardRef, useState, useEffect } from 'react';

const Div100vh = forwardRef(({ style, ... other}, ref) => {

  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {

    const setMeasuredHeight = () => {
      let measuredHeight = window.innerHeight;
      setHeight(measuredHeight)
    }

    window.addEventListener('resize', setMeasuredHeight)

    return () => ( window.removeEventListener('resize', setMeasuredHeight) )
  },[])

  const styleWithRealHeight = {
    ...style,
    height: height ? `${height}px` : '100vh'
  }

  return ( <div ref={ref} style={styleWithRealHeight} {...other} /> )
});

Div100vh.displayName = 'Div100vh'

export default Div100vh
