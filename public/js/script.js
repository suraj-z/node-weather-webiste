console.log('using javascript for page')

const ele=document.querySelector('h1');
ele.addEventListener('mouseenter' , () => {
    ele.style.color= 'grey';
})
ele.addEventListener('mouseleave' , () => {
    ele.style.color = 'black';  
})

const weatherform=document.querySelector('form');
const search= document.querySelector('input')
const messageone=document.getElementById('message1')
const messagetwo=document.getElementById('message2')

weatherform.addEventListener('submit' , (e)=>{
    e.preventDefault();
    const location=search.value;
    messageone.textContent= 'Loading.......'
    messagetwo.textContent =' '
    
    fetch('/weather?address=' +location).then((response) => {
            response.json().then((data) => {

                if(data.error){
                    messageone.textContent=data.error;
                }
                else{

                    messageone.textContent=(data.location);
                    messagetwo.textContent=(data.forecast)
                }
            })
})
})