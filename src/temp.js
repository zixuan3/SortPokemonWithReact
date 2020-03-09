import React from 'react';
import axios from 'axios';
/*import logo from './logo.svg';
import { useState, useEffect, useRef } from 'react';*/
import './App.css';
/*import ModalHook from "./ModalHook";*/
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from 'react-router-dom';



class DetailWrapper extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			showStore: false
		}
	}
	
	componentDidMount() {
		document.addEventListener('mousedown', this.handleClick, false);
	}
	
	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClick, false);
	}
	
	handleClick = (e) => {
		if (this.node.contains(e.target)) {
			//The click is inside, continue to whatever you are doing
			this.setState({showStore: true});
			console.log("clicked inside");
			return;
		}
		
		//The click is outside, do something
		this.handleClickOutside();
	}
	
	handleClickOutside() {
		this.setState({showStore: false});
		console.log("clicked outside");
	}
	
	render() {
		return (
			<div>
				<div ref={node => this.node = node}>
					<SpriteButton number="150"/>
				</div>
				<div>
					<MyModal clicked = {this.state.showStore}/>
				</div>
			</div>
		);
	}
}

class SpriteButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			number: this.props.number
		};
	}
	
	render() {
		//console.log("this.state.number: ", this.state.number);
		var imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + this.state.number + ".png";
		console.log("imageUrl: ", imageUrl);
		return (
			<div className="medal">
				<button className="medalButton" id={this.state.number} onClick={this.handleClick}>
					<img src={imageUrl} alt={this.state.number + " image"}/>
					{/*<div className="medals_captions">Mewtwo</div>*/}
				</button>
			</div>
		);
	}
}

 function RouterStructure() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>

        <hr />
	  	<Switch>
          <Route exact path="/">
            <Home />
	  		<DetailWrapper/>
          </Route>
          <Route path="/about">
            <About />
	  		<Mewtwo />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
	  		<FilterablePokemonTableWrapper/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

class DetailModal extends React.Component {
	
	constructor(props) {
		super(props);
	}
	
	render() {
		var imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + this.props.number + ".png";
		return (<div className="modal-flex">
			<div className="modal-content">
				<img src={imageUrl} alt="alt_text"/>
				<div className="modal-text-gold">Mewtwo</div>
			</div>
		</div>
		);
	}
}

class MyModal extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = { clicked: this.props.clicked};
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick(e) {
		e.preventDefault();
		//console.log("this.props.clicked",this.props.clicked);
		this.setState({ clicked: true});
	}
	
	render() {
		console.log(this.props.clicked);
		if (this.props.clicked === false) {
			return (null);
		} else {
			return (
				<div className="modal-clicked">
					<DetailModal number="150"/>
				</div>
			);
		}
	}
}

class PokemonRow extends React.Component {
	render() {
		/*const name =
			<span style={{color: 'blue'}}>
				{this.props.Pokemon.pokemon.name}
			</span>;*/
		var pokemonId = this.props.Pokemon.pokemon.url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '');
		var imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemonId + ".png";
		var imageUrlShiny = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/" + pokemonId + ".png";
		return (
			<tr>
				<td>{this.props.Pokemon.pokemon.name}</td>
				<td>{this.props.Pokemon.pokemon.url}</td>
				<td>{this.props.Pokemon.pokemon.type}</td>
				<td>{this.props.Pokemon.pokemon.type2}</td>
				<td><img src={imageUrl} alt={this.props.Pokemon.pokemon.name}/></td>
				<td><img src={imageUrlShiny} alt={this.props.Pokemon.pokemon.name}/></td>
			</tr>
		);
	}
}

class PokemonTable extends React.Component {
	render() {
		//console.log("this.props",this.props);
		const filterText = this.props.filterText;
		
		const normalOnly = this.props.normalOnly;
		const fightingOnly = this.props.fightingOnly;
		const flyingOnly = this.props.flyingOnly;
		const poisonOnly = this.props.poisonOnly;
		const groundOnly = this.props.rockOnly;
		const rockOnly = this.props.rockOnly;
		const bugOnly = this.props.bugOnly;
		const ghostOnly = this.props.ghostOnly;
		const steelOnly = this.props.steelOnly;
		const fireOnly = this.props.fireOnly;
		const waterOnly = this.props.waterOnly;
		const grassOnly = this.props.grassOnly;
		const electricOnly = this.props.electricOnly;
		const psychicOnly = this.props.psychicOnly;
		const iceOnly = this.props.iceOnly;
		const dragonOnly = this.props.dragonOnly;
		const darkOnly = this.props.darkOnly;
		const fairyOnly = this.props.fairyOnly;
		
		const rows = [];
		this.props.Pokemons.some((item) => {
			var pokemonId = item.pokemon.url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '');
			
			if (item.pokemon.name.indexOf(filterText) === -1 && pokemonId.indexOf(filterText) === -1) {
				return false;
			}
			if (normalOnly && ((item.pokemon.type !== "normal") && (item.pokemon.type2 !== "normal"))) {
				return false;
			}
			if (fightingOnly && ((item.pokemon.type !== "fighting") && (item.pokemon.type2 !== "fighting"))) {
				return false;
			}
			if (flyingOnly && ((item.pokemon.type !== "flying") && (item.pokemon.type2 !== "flying"))) {
				return false;
			}
			if (poisonOnly && ((item.pokemon.type !== "poison") && (item.pokemon.type2 !== "poison"))) {
				return false;
			}
			if (groundOnly && ((item.pokemon.type !== "ground") && (item.pokemon.type2 !== "ground"))) {
				return false;
			}
			if (rockOnly && ((item.pokemon.type !== "rock") && (item.pokemon.type2 !== "rock"))) {
				return false;
			}
			if (bugOnly && ((item.pokemon.type !== "bug") && (item.pokemon.type2 !== "bug"))) {
				return false;
			}
			if (ghostOnly && ((item.pokemon.type !== "ghost") && (item.pokemon.type2 !== "ghost"))) {
				return false;
			}
			if (steelOnly && ((item.pokemon.type !== "steel") && (item.pokemon.type2 !== "steel"))) {
				return false;
			}
			if (fireOnly && ((item.pokemon.type !== "fire") && (item.pokemon.type2 !== "fire"))) {
				return false;
			}
			if (waterOnly && ((item.pokemon.type !== "water") && (item.pokemon.type2 !== "water"))) {
				return false;
			}
			if (grassOnly && ((item.pokemon.type !== "grass") && (item.pokemon.type2 !== "grass"))) {
				return false;
			}
			if (electricOnly && ((item.pokemon.type !== "electric") && (item.pokemon.type2 !== "electric"))) {
				return false;
			}
			if (psychicOnly && ((item.pokemon.type !== "psychic") && (item.pokemon.type2 !== "psychic"))) {
				return false;
			}
			if (iceOnly && ((item.pokemon.type !== "ice") && (item.pokemon.type2 !== "ice"))) {
				return false;
			}
			if (dragonOnly && ((item.pokemon.type !== "dragon") && (item.pokemon.type2 !== "dragon"))) {
				return false;
			}
			if (darkOnly && ((item.pokemon.type !== "dark") && (item.pokemon.type2 !== "dark"))) {
				return false;
			}
			if (fairyOnly && ((item.pokemon.type !== "fairy") && (item.pokemon.type2 !== "fairy"))) {
				return false;
			}
			rows.push(
				<PokemonRow
					Pokemon={item}
					Type={item.pokemon.type}
					key={pokemonId}
				/>
			);
			return rows.length === 20;
		})
		return (
			<table>
				<thead>
					<tr>
						<th>NAME</th>
						<th>URL</th>
						<th>TYPE</th>
						<th>TYPE2</th>
						<th>IMAGE</th>
						<th>IMAGE-SHINY</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>
		);
	}
}

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
		this.handleNormalChange = this.handleNormalChange.bind(this);
		this.handleFightingChange = this.handleFightingChange.bind(this);
		this.handleFlyingChange = this.handleFlyingChange.bind(this);
		this.handlePoisonChange = this.handlePoisonChange.bind(this);
		this.handleGroundChange = this.handleGroundChange.bind(this);
		this.handleRockChange = this.handleRockChange.bind(this);
		this.handleBugChange = this.handleBugChange.bind(this);
		this.handleGhostChange = this.handleGhostChange.bind(this);
		this.handleSteelChange = this.handleSteelChange.bind(this);
		this.handleFireChange = this.handleFireChange.bind(this);
		this.handleWaterChange = this.handleWaterChange.bind(this);
		this.handleGrassChange = this.handleGrassChange.bind(this);
		this.handleElectricChange = this.handleElectricChange.bind(this);
		this.handlePsychicChange = this.handlePsychicChange.bind(this);
		this.handleIceChange = this.handleIceChange.bind(this);
		this.handleDragonChange = this.handleDragonChange.bind(this);
		this.handleDarkChange = this.handleDarkChange.bind(this);
		this.handleFairyChange = this.handleFairyChange.bind(this);
	}
	handleFilterTextChange(e) {
		this.props.onFilterTextChange(e.target.value);
	}
	
	handleNormalChange(e) {
		this.props.onNormalChange(e.target.checked);
	}
	handleFightingChange(e) {
		this.props.onFightingChange(e.target.checked);
	}
	handleFlyingChange(e) {
		this.props.onFlyingChange(e.target.checked);
	}
	handlePoisonChange(e) {
		this.props.onPoisonChange(e.target.checked);
	}
	handleGroundChange(e) {
		this.props.onGroundChange(e.target.checked);
	}
	handleRockChange(e) {
		this.props.onRockChange(e.target.checked);
	}
	handleBugChange(e) {
		this.props.onBugChange(e.target.checked);
	}
	handleGhostChange(e) {
		this.props.onGhostChange(e.target.checked);
	}
	handleSteelChange(e) {
		this.props.onSteelChange(e.target.checked);
	}
	handleFireChange(e) {
		this.props.onFireChange(e.target.checked);
	}
	handleWaterChange(e) {
		this.props.onWaterChange(e.target.checked);
	}
	handleGrassChange(e) {
		this.props.onGrassChange(e.target.checked);
	}
	handleElectricChange(e) {
		this.props.onElectricChange(e.target.checked);
	}
	handlePsychicChange(e) {
		this.props.onPsychicChange(e.target.checked);
	}
	handleIceChange(e) {
		this.props.onIceChange(e.target.checked);
	}
	handleDragonChange(e) {
		this.props.onDragonChange(e.target.checked);
	}
	handleDarkChange(e) {
		this.props.onDarkChange(e.target.checked);
	}
	handleFairyChange(e) {
		this.props.onFairyChange(e.target.checked);
	}
	
	render() {
		return (
			<form>
				<input
					type="text"
					placeholder="Search.."
					value={this.props.filterText}
					onChange={this.handleFilterTextChange}
				/>
				<p>
					<input
						type="checkbox"
						checked={this.props.normalOnly}
						onChange={this.handleNormalChange}
					/>
					{' '}
					Only show normal type Pokemons
				</p>
				<p>
					<input
						type="checkbox"
						checked={this.props.fightingOnly}
						onChange={this.handleFightingChange}
					/>
					{' '}
					Only show fighting type Pokemons
				</p>
				<p>
					<input
						type="checkbox"
						checked={this.props.flyingOnly}
						onChange={this.handleFlyingChange}
					/>
					{' '}
					Only show flying type Pokemons
				</p>
				<p>
					<input
						type="checkbox"
						checked={this.props.poisonOnly}
						onChange={this.handlePoisonChange}
					/>
					{' '}
					Only show poison type Pokemons
				</p>
				<p>
					<input
						type="checkbox"
						checked={this.props.groundOnly}
						onChange={this.handleGroundChange}
					/>
					{' '}
					Only show ground type Pokemons
				</p>
				<p>
					<input
						type="checkbox"
						checked={this.props.rockOnly}
						onChange={this.handleRockChange}
					/>
					{' '}
					Only show rock type Pokemons
				</p>
				<p>
					<input
						type="checkbox"
						checked={this.props.bugOnly}
						onChange={this.handleBugChange}
					/>
					{' '}
					Only show bug type Pokemons
				</p>
				<p>
					<input
						type="checkbox"
						checked={this.props.ghostOnly}
						onChange={this.handleGhostChange}
					/>
					{' '}
					Only show ghost type Pokemons
				</p>
				<p>
					<input
						type="checkbox"
						checked={this.props.steelOnly}
						onChange={this.handleSteelChange}
					/>
					{' '}
					Only show steel type Pokemons
				</p>
				<p>
					<input
						type="checkbox"
						checked={this.props.fireOnly}
						onChange={this.handleFireChange}
					/>
					{' '}
					Only show fire type Pokemons
				</p>
				<p>
					<input
						type="checkbox"
						checked={this.props.waterOnly}
						onChange={this.handleWaterChange}
					/>
					{' '}
					Only show water type Pokemons
				</p>
				<p>
					<input
						type="checkbox"
						checked={this.props.grassOnly}
						onChange={this.handleGrassChange}
					/>
					{' '}
					Only show grass type Pokemons
				</p>
				<p>
					<input
						type="checkbox"
						checked={this.props.electricOnly}
						onChange={this.handleElectricChange}
					/>
					{' '}
					Only show electric type Pokemons
				</p>
				<p>
					<input
						type="checkbox"
						checked={this.props.psychicOnly}
						onChange={this.handlePsychicChange}
					/>
					{' '}
					Only show psychic type Pokemons
				</p>
				<p>
					<input
						type="checkbox"
						checked={this.props.iceOnly}
						onChange={this.handleIceChange}
					/>
					{' '}
					Only show ice type Pokemons
				</p>
				<p>
					<input
						type="checkbox"
						checked={this.props.dragonOnly}
						onChange={this.handleDragonChange}
					/>
					{' '}
					Only show dragon type Pokemons
				</p>
				<p>
					<input
						type="checkbox"
						checked={this.props.darkOnly}
						onChange={this.handleDarkChange}
					/>
					{' '}
					Only show dark type Pokemons
				</p>
				<p>
					<input
						type="checkbox"
						checked={this.props.fairyOnly}
						onChange={this.handleFairyChange}
					/>
					{' '}
					Only show fairy type Pokemons
				</p>
			</form>
		);
	}
}

class FilterablePokemonTableWrapper extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			APIURL: '',
			pokemonList: []
		};
	}
	
	componentDidMount() {
		axios.get(`https://pokeapi.co/api/v2/type/1/`)
		  .then(res => {
			var pokemonData = res.data.pokemon;
			this.setState({ pokemonList: pokemonData });
			this.setState({ type: res.data.name });
			this.setState((state) => {
				var copyList = this.state.pokemonList;
				for (var i = 0; i < this.state.pokemonList.length; i++) {
					copyList[i].pokemon.type = this.state.type;
				}
				return {pokemonList: copyList};
			});
		  })
		for (var typeNumber = 2; typeNumber <= 18; typeNumber++) {
			axios.get(`https://pokeapi.co/api/v2/type/` + typeNumber + `/`)
				.then(res => {
				var pokemonData = res.data.pokemon;
				var newTypeName = res.data.name;
				this.setState((state) => {
					var copyList = this.state.pokemonList;
					for (var i = 0; i < pokemonData.length; i++) {
						var newPokemon = pokemonData[i];
						newPokemon.pokemon.type = newTypeName;
						var newPokemonName = newPokemon.pokemon.name;
						var doubleType = false;
						for (var j = 0; j < copyList.length; j++) {
							if (copyList[j].pokemon.name === newPokemonName) {
								copyList[j].pokemon.type2 = newTypeName;
								doubleType = true;
								break;
							}
						}
						if (doubleType === false) {
							copyList = [...copyList, newPokemon];
						}
					}
					return {pokemonList: copyList};
				});
			})
		}
	}
	
	render() {
		return(
			<FilterablePokemonTable
				Pokemons={this.state.pokemonList}
				Type={this.state.type}/>
		);
	}
}

class FilterablePokemonTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filterText: '',
			normalOnly: false,
			fightingOnly: false,
			flyingOnly: false,
			poisonOnly: false,
			groundOnly: false,
			rockOnly: false,
			bugOnly: false,
			ghostOnly: false,
			steelOnly: false,
			fireOnly: false,
			waterOnly: false,
			grassOnly: false,
			electricOnly: false,
			psychicOnly: false,
			iceOnly: false,
			dragonOnly: false,
			darkOnly: false,
			fairyOnly: false
		};	
		this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
		this.handleNormalChange = this.handleNormalChange.bind(this);
		this.handleFightingChange = this.handleFightingChange.bind(this);
		this.handleFlyingChange = this.handleFlyingChange.bind(this);
		this.handlePoisonChange = this.handlePoisonChange.bind(this);
		this.handleGroundChange = this.handleGroundChange.bind(this);
		this.handleRockChange = this.handleRockChange.bind(this);
		this.handleBugChange = this.handleBugChange.bind(this);
		this.handleGhostChange = this.handleGhostChange.bind(this);
		this.handleSteelChange = this.handleSteelChange.bind(this);
		this.handleFireChange = this.handleFireChange.bind(this);
		this.handleWaterChange = this.handleWaterChange.bind(this);
		this.handleGrassChange = this.handleGrassChange.bind(this);
		this.handleElectricChange = this.handleElectricChange.bind(this);
		this.handlePsychicChange = this.handlePsychicChange.bind(this);
		this.handleIceChange = this.handleIceChange.bind(this);
		this.handleDragonChange = this.handleDragonChange.bind(this);
		this.handleDarkChange = this.handleDarkChange.bind(this);
		this.handleFairyChange = this.handleFairyChange.bind(this);
	}

	handleFilterTextChange(filterText) {
		this.setState({
			filterText: filterText
		});
	}
	
	handleNormalChange(normalOnly) {
		this.setState({
			normalOnly: normalOnly
		})
	}
	
	handleFightingChange(fightingOnly) {
		this.setState({
			fightingOnly: fightingOnly
		})
	}
	
	handleFlyingChange(flyingOnly) {
		this.setState({
			flyingOnly: flyingOnly
		})
	}
	
	handlePoisonChange(poisonOnly) {
		this.setState({
			poisonOnly: poisonOnly
		})
	}
	
	handleGroundChange(groundOnly) {
		this.setState({
			groundOnly: groundOnly
		})
	}
	
	handleRockChange(rockOnly) {
		this.setState({
			rockOnly: rockOnly
		})
	}
	
	handleBugChange(bugOnly) {
		this.setState({
			bugOnly: bugOnly
		})
	}
	
	handleGhostChange(ghostOnly) {
		this.setState({
			ghostOnly: ghostOnly
		})
	}
	
	handleSteelChange(steelOnly) {
		this.setState({
			steelOnly: steelOnly
		})
	}
	
	handleFireChange(fireOnly) {
		this.setState({
			fireOnly: fireOnly
		})
	}
	
	handleWaterChange(waterOnly) {
		this.setState({
			waterOnly: waterOnly
		})
	}
	
	handleGrassChange(grassOnly) {
		this.setState({
			grassOnly: grassOnly
		})
	}
	
	handleElectricChange(electricOnly) {
		this.setState({
			electricOnly: electricOnly
		})
	}
	
	handlePsychicChange(psychicOnly) {
		this.setState({
			psychicOnly: psychicOnly
		})
	}
	
	handleIceChange(iceOnly) {
		this.setState({
			iceOnly: iceOnly
		})
	}
	
	handleDragonChange(dragonOnly) {
		this.setState({
			dragonOnly: dragonOnly
		})
	}
	
	handleDarkChange(darkOnly) {
		this.setState({
			darkOnly: darkOnly
		})
	}
	
	handleFairyChange(fairyOnly) {
		this.setState({
			fairyOnly: fairyOnly
		})
	}
	render() {
		return (
			<div>
				<SearchBar
					filterText={this.state.filterText}
					normalOnly={this.state.normalOnly}
					onFilterTextChange={this.handleFilterTextChange}
					onNormalChange={this.handleNormalChange}
					onFightingChange={this.handleFightingChange}
					onFlyingChange={this.handleFlyingChange}
					onPoisonChange={this.handlePoisonChange}
					onGroundChange={this.handleGroundChange}
					onRockChange={this.handleRockChange}
					onBugChange={this.handleBugChange}
					onGhostChange={this.handleGhostChange}
					onSteelChange={this.handleSteelChange}
					onFireChange={this.handleFireChange}
					onWaterChange={this.handleWaterChange}
					onGrassChange={this.handleGrassChange}
					onElectricChange={this.handleElectricChange}
					onPsychicChange={this.handlePsychicChange}
					onIceChange={this.handleIceChange}
					onDragonChange={this.handleDragonChange}
					onDarkChange={this.handleDarkChange}
					onFairyChange={this.handleFairyChange}
				/>
				<PokemonTable
					Pokemons={this.props.Pokemons}
					Type={this.props.Type}
					filterText={this.state.filterText}
					normalOnly={this.state.normalOnly}
					fightingOnly={this.state.fightingOnly}
					flyingOnly={this.state.flyingOnly}
					poisonOnly={this.state.poisonOnly}
					groundOnly={this.state.groundOnly}
					rockOnly={this.state.rockOnly}
					bugOnly={this.state.bugOnly}
					ghostOnly={this.state.ghostOnly}
					steelOnly={this.state.steelOnly}
					fireOnly={this.state.fireOnly}
					waterOnly={this.state.waterOnly}
					grassOnly={this.state.grassOnly}
					electricOnly={this.state.electricOnly}
					psychicOnly={this.state.psychicOnly}
					iceOnly={this.state.iceOnly}
					dragonOnly={this.state.dragonOnly}
					darkOnly={this.state.darkOnly}
					fairyOnly={this.state.fairyOnly}
				/>
			</div>
		);
	}
}

/*const PokemonS = [
	{category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
	{category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
	{category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
	{category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
	{category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
	{category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];*/

/*class PersonList extends React.Component {
  state = {
    persons: []
  }

  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }

  render() {
    return (
      <ul>
        { this.state.persons.map(person => <li>{person.name}</li>)}
      </ul>
    )
  }
}*/

class Mewtwo extends React.Component {
	state = {
		mewtwo_abilities0: "",
		mewtwo_ability: "",
		mewtwo_ability_name: "",
		mewtwo_sprite_url: ""
	}

	componentDidMount() {
		axios.get('https://pokeapi.co/api/v2/pokemon/mewtwo')
			.then(res => {
			this.setState({ mewtwo_ability: res.data.abilities[0].ability});
			this.setState({ mewtwo_ability_name: res.data.abilities[0].ability.name});
			this.setState({ mewtwo_sprite_url: res.data.sprites.front_shiny});
		})
	}
	
	render() {
		return (
			<div>
				<div> {this.state.mewtwo_ability_name} </div>
				<div> {this.state.mewtwo_ability.name} </div>
				<img src={this.state.mewtwo_sprite_url} alt="mewtwo_front_shiny"/>
			</div>
		)
	}
}

function App() {
  return (
    <div className="App">
	  <div>
	  	{ RouterStructure()}
	  </div>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

export default App;

//https://pokeapi.co/api/v2/pokemon?offset=0&limit=964
//https://pokeapi.co/api/v2/type
//https://pokeapi.co/api/v2/type/1/
//flying poison ground rock bug ghost steel fire water grass electric psychic ice dragon dark fairy