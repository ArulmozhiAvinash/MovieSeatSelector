const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const totalAmount = document.getElementById('totalAmount');
let selectedMovie = document.getElementById('movie');
let ticektPrice = +selectedMovie.value; 

let populateUi = () => {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats !== null && selectedSeats.length>0){
        seats.forEach((seat,index) => {
            if(selectedSeats.indexOf(index)>-1){
                seat.classList.add('selected');
            }
        })
    }
    let selectedMovieIndex =localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex != null){
        selectedMovie.selectedIndex = selectedMovieIndex;
        updateSelectedCount();
    }
}
let updateSelectedCount = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const seectedSeatIndex = [...selectedSeats].map( seat => [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats',JSON.stringify(seectedSeatIndex));
    count.innerText = selectedSeats.length;
    totalAmount.innerText = (selectedSeats.length)*ticektPrice;
}

let setMovieData = (movieIndex,moviePrice) =>{
    localStorage.setItem('selectedMovieIndex',movieIndex);
    localStorage.setItem('selectedMovieValue',moviePrice);
}

selectedMovie.addEventListener('change', event => {
    ticektPrice = +event.target.value; 
    setMovieData(event.target.selectedIndex,event.target.value);
    updateSelectedCount();
})

container.addEventListener('click', e =>{
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected')
        updateSelectedCount();
    }
})
populateUi();