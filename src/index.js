import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

let quotes = [];


function GetRandomQuote() {
  const random = Math.floor(Math.random() * quotes.length);
  return quotes[random];
}

function GetRandomColorValue() {
  const min = 44;
  const max = 80;
  return Math.floor(Math.random() * (max-min)) + min;
}

function GetRandomColor() {
  return `rgb(${GetRandomColorValue()},${GetRandomColorValue()},${GetRandomColorValue()})`;
}

function SetBodyColor(color=GetRandomColor()) {
  const body = document.querySelector('body');
  body.style.backgroundColor = color;
  body.style.color = color;

}

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.updateColor = this.updateColor.bind(this);
    this.state = {
      quote: {
        quote: '',
        author: ''
      }
    }
  }

  componentDidMount() {
    console.log('Fetch quotes from API');
    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
      .then(res => res.json())
      .then(result => {
        quotes = result.quotes;
        this.setState({ quote: GetRandomQuote() });
      });
      this.updateColor();
  }

  updateColor() {
    const color = GetRandomColor();
    this.setState(state => {
      return {
        color
      }
    });
    SetBodyColor(color);
  }

  handleClick(e) {
    // update quote state here
    const randomQuote = GetRandomQuote();
    console.log(randomQuote);
    this.setState(state => {
      return {
        quote: randomQuote,
      }
    });
    this.updateColor();
  }

  render() {
    return (
      <div id='quote-box'>
        <Text quote={this.state.quote.quote} author={this.state.quote.author} />
        <QuoteInteraction handleClick={this.handleClick} bgColor={this.state.color} />
      </div>
    );
  }
}

function Text(props) {
  return (
    <div>
      <p id='text'>{props.quote}</p>
      <p id='author'>- {props.author}</p>
    </div>
  );
}

function QuoteInteraction(props) {
  const style = {
    backgroundColor: props.bgColor
  }
  return (
    <div className='buttons'>
      <a href='twitter.com/intent/tweet' id='tweet-quote' target='_blank' title='Share to Tweeter' style={style}><i className="fa-brands fa-twitter"></i></a>
      <a href='twitter.com/intent/tweet' id='tumblr-quote' target='_blank' title='Share to Tumblr' style={style}><i className="fa-brands fa-twitter"></i></a>
      <button type='button' id='new-quote' onClick={props.handleClick} style={style}>New quote</button>
    </div>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<QuoteBox />);
