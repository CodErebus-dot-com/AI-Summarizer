import Logo from '../assets/logo.svg'

const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
        <nav className='flex justify-between items-center w-full mb-10 pt-3'>
            <img src={Logo} alt='This is the AI Summarizer Logo' className='w-28 object-contain' />
            <button
                className='black_btn'
                onClick={() => window.open('https://github.com/CodErebus-dot-com/AI-Summarizer')}
            >
                GitHub
            </button>
        </nav>

        <h1 className='head_text'>
            Summarize Articles with
            <br className='max-md:hidden'/>
            <span className='orange_gradient'>
                OpenAI's GPT-4
            </span>
        </h1>

        <h2 className='desc'>
            Simplify your reading with Summarizer, a free tool that uses the power of OpenAI's GPT-4 to make clear and concise summaries out of any article or piece of text
        </h2>
    </header>
  )
}

export default Hero