import React from 'react';
import reqwest from 'reqwest';

class HelloWorld extends React.Component {

  constructor(props) {
    super(props);
    this.state = {image: props.image};
    this.search = this.search.bind(this);
  }

  search(e) {
    reqwest('http://localhost:8053/moves?pokemon=' + e.target.value)
      .then((resp) => {
        var pokemon = JSON.parse(resp.response);
        if (pokemon.moves.list.length > 0) {
          this.setState({image: pokemon.image});
        } else {
          this.setState({image: 'http://vignette3.wikia.nocookie.net/pokemon/images/6/66/Pok%C3%A9bola.png/revision/latest?cb=20160110191524&path-prefix=pt'});
        }
      })
      .fail((err, msg) => {
        console.log(err, msg);
      })
  }

  render() {
    return (
      <div>
        <h1>Pokemon 1st Generation Moves</h1>
        Pokemon Name: <input type="text" onChange={this.search} />
        <br/><br/><br/>
        <img src={this.state.image} />
      </div>
    )
  }
}

HelloWorld.defaultProps = { image:'http://vignette3.wikia.nocookie.net/pokemon/images/6/66/Pok%C3%A9bola.png/revision/latest?cb=20160110191524&path-prefix=pt'};

export default HelloWorld;
