
import { API } from '../services/api'

export default function SellerForm(){
  const submit = async () => {
    await API.post('/cars/add', {
      name:'Ertiga',
      year:2016,
      km:107444,
      owner:2,
      price:4.85
    })
    alert('Car Uploaded')
  }

  return <button onClick={submit}>Upload Car</button>
}
