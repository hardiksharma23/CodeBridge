import React from 'react'
import { TypeAnimation } from 'react-type-animation'

const CodeBlocks_2 = () => {
  return (
    <div className='h-fit border-2 border-gray-400 rounded-xl flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]'>
        <div className='text-center flex flex-col w-[10%] text-gray-400 font-serif font-bold'>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
        </div>

        <div className='w-[90%] flex flex-col gap-2 font-bold font-mono text-blue-400 pr-2'>
            <TypeAnimation
                sequence={['import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;', 3000, ""]}
                repeat={Infinity}
                style={
                    {
                        whiteSpace: 'pre-line',
                        display: "block"
                    }
                }
                omitDeletionAnimation={true}
            />
        </div>
    </div>
  )
}

export default CodeBlocks_2