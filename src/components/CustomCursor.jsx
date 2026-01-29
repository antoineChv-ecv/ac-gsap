import React, { useEffect } from 'react'
import gsap from 'gsap'
import MouseFollower from 'mouse-follower';
import 'mouse-follower/dist/mouse-follower.min.css';

const CustomCursor = () => {
    useEffect(() => {

        MouseFollower.registerGSAP(gsap)
        const cursor = new MouseFollower({
            speed: 0.5,
            skewing: 1,
            skewingText: 2
        })
        return () => {
            cursor.destroy()
        }
    }, [])
    return null
}

export default CustomCursor