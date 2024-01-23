import useUploadModal from '@/hooks/useUploadModal'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import uniqid from 'uniqid'
import { useUser } from '@/hooks/useUser';
import { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';


import Modal from './Modal'
import Input from './Input';
import Button from './Button';

const UploadModal = () => {
  const uploadModal = useUploadModal();
  const [isLoading , setIsLoading] = useState(false)
  const {user} = useUser()
  const supabaseClient= useSupabaseClient()

  const {register , handleSubmit , reset} = useForm<FieldValues>({
    defaultValues :{
      author : '',
      title : '',
      song : null,
      image : null
    }
  })

  const onChange = (open : boolean) => {
    if(!open){
      reset()
      uploadModal.onClose( )
    }
  }

  const onSubmit : SubmitHandler<FieldValues> =async (values) => {
  try{
  setIsLoading(true)

  const imageFile = values.image?.[0];
  const songFile = values.song?.[0]
  
  if(!imageFile || !songFile || !user){
    toast.error('Missing Fields')
    return
  }

  const uniqueId = uniqid()

  // upload song
  // const {
  //  data : songData ,
  //  error : songError
  // } = await supabaseClient.storage.from('songs')

  }catch(error){
    toast.error("Something went wrong")
  }finally{
    setIsLoading(false)
  }
  }


  return (
    <Modal
    title='Add a song'
    description='Upload an Mp3 files'
    isOpen={uploadModal.isOpen}
    onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
      <Input
       id ="title"
       disabled={isLoading}
       {...register('title' , {required : true})}
       placeholder =  'Song title'
      />
      <Input
       id ="author"
       disabled={isLoading}
       {...register('author' , {required : true})}
       placeholder =  'Song author'
      />
      <div>
        <div className='pb-1'>
          Select a song file
        </div>
        <Input
       id ="song"
       disabled={isLoading}
       type='file'
       accept='.mp3'
       {...register('song' , {required : true})}
       placeholder =  'Song author'
      />
      </div>
      <div>
        <div className='pb-1'>
          Select an image
        </div>
        <Input
       id ="image"
       disabled={isLoading}
       type='file'
       accept='image/*'
       {...register('image' , {required : true})}
       placeholder =  'Song author'
      />
      </div>
      <Button disabled={isLoading} type='submit' className='text-white'>Create</Button>
      </form>
     
    </Modal>
  )
}

export default UploadModal