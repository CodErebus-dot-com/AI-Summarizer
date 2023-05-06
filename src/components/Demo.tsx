import { FormEvent, useEffect, useState } from 'react'
import { copy, linkIcon, loader, tick } from '../assets'
import { useLazyGetSummaryQuery } from '../services/article.slice'

type Article = { 
  summary: string,
  url: string,
}

type Url = string | null | undefined;

const Demo = () => {
  const [article, setArticle] = useState<Article>({
      url: '',
      summary: '',
  });
  const [history, setHistory] = useState<Article[]>([])
  const [copied, setCopied] = useState<Url>(null)
  const [getSummary, {error, isFetching}] = useLazyGetSummaryQuery()

  useEffect(() => {
    const savedArticles = JSON.parse(localStorage.getItem('articles') || '[]')

    if (savedArticles) {
      setHistory(savedArticles)
    }
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const { data } = await getSummary({ articleUrl: article.url })
    
      if (data?.summary) {
        const newArticle = { ...article, summary: data.summary }
        const updatedHistory = [...history, newArticle]
        
        setArticle(newArticle)
        setHistory(updatedHistory)
        
        localStorage.setItem('articles', JSON.stringify(updatedHistory))
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleCopy = (url: string) => {
    setCopied(url)
    navigator.clipboard.writeText(url)
    setTimeout(() => setCopied(null), 3000);
  }

  return (
    <section className='mt-16 w-full max-w-xl'>
      {/* Search */}
      <div className='flex flex-col w-full gap-2'>
        <form className='relative flex justify-center items-center' onSubmit={handleSubmit}>
          <img src={linkIcon} alt='link icon' className='absolute left-0 my-2 ml-3 w-5' />

          <input 
            type='url'
            placeholder='Provide a link or a URL to your article'
            value={article.summary ? '' : article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className='url_input peer'
          />

          <button
            type='submit'
            className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700'
          >
            ↵
          </button>
        </form>
      </div>

      {/* Browse URL history */}
      <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
        {
          history.map((article, index) => (
            <div key={`link-${index}`} onClick={() => setArticle(article)} className='link_card'>
              <div className='copy_btn' onClick={() => handleCopy(article.url)}>
                <img 
                  src={copied === article.url ? tick : copy} 
                  alt={copied === article.url ? 'copied to clipboard successfully icon' : 'copy to clipboard icon'} 
                  className='w-[40%] h-[40%] object-contained' 
                />
              </div>
              <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                {article.url}
              </p>
            </div>
          ))
        }
      </div>


      {/* Display summary */}
      <div className='my-10 max-w-full flex justify-center items-center'>
        {
          isFetching ? (
            <img src={loader} alt='loader icon' className='w-20 h-20 object-contain' />
          ) : error ? (
            <p className='font-inter font-bold text-black text-center'>
              Sorry, we couldn't fetch the summary for this article
              <br />
              <span className='font-satoshi font-normal text-gray-700'>
              {error && error.toString()}
              </span>
            </p>
          ) : (
            article.summary && (
              <div className='flex flex-col gap-3'>
                <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                  Article <span className='blue_gradient'>Summary</span>
                </h2>
                <div className='summary_box'>
                  <p className='font-inter font-medium text-gray-700 text-sm'>
                    {article.summary}
                  </p>
                </div>
              </div>
            )
          )
        }
      </div>
    </section>
  )
}

export default Demo