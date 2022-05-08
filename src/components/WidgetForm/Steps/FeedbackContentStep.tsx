import { ArrowLeft } from 'phosphor-react';
import { FormEvent, useState } from 'react';
import { FeedbackType, feedbackTypes } from '..';
import { api } from '../../../lib/api';
import { CloseButton } from '../../CloseButton';
import { Loading } from '../../Loading';
import { ScreenshotButton } from '../../ScreenshotButton';

interface FeedbackContentStepProps {
  onFeedbackSent: () => void;
  feedbackTypeSelected: FeedbackType;
  onfeedbackRestartRequested: () => void;
}

export function FeedbackContentStep({
  onFeedbackSent,
  feedbackTypeSelected,
  onfeedbackRestartRequested,
}: FeedbackContentStepProps) {
  const [comment, setComment] = useState('');
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isSendingFeedback, setIsSendingfeedback] = useState(false);
  const feedbackTypeInfo = feedbackTypes[feedbackTypeSelected];

  async function sendFeedback(e: FormEvent) {
    e.preventDefault();

    setIsSendingfeedback(true);

    await api.post('/feedbacks', {
      type: feedbackTypeSelected,
      comment,
      screenshot,
    });

    onFeedbackSent();
  }

  return (
    <>
      <header>
        <button
          type='button'
          className='absolute top-5 left-5 text-zinc-400 hover:text-zinc-100'
          onClick={onfeedbackRestartRequested}
        >
          <ArrowLeft weight='bold' className='w-4 h-4' />
        </button>
        <span className='flex items-center gap-2 text-xl leading-6'>
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className='h-6 w-6'
          />
          {feedbackTypeInfo.title}
        </span>
        <CloseButton />
      </header>

      <form onSubmit={sendFeedback} className='my-4 w-full'>
        <textarea
          placeholder='cuente con detalle su inconveniente'
          className='min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 facus:ring-1  focus:outline-none resize-none  scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin'
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        <footer className='flex mt-2 gap-2'>
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotTook={setScreenshot}
          />
          <button
            type='submit'
            className='flex justify-center  items-center  flex-1 bg-brand-500 rounded-md  text-sm hover:bg-brand-300 p-2  border-transparent  focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 focus:outline-none transition-colors disabled:opacity-50 disabled:hover:bg-brand-500'
            // onClick={sendFeedback}
            disabled={comment.length === 0 || isSendingFeedback}
          >
            {isSendingFeedback ? <Loading /> : 'Enviar feedback'}
          </button>
        </footer>
      </form>
    </>
  );
}
