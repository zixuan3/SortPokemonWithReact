import PropTypes from 'prop-types';
import React from 'react';
import axios from 'axios';
import DetailWrapper from './DetailWrapper.js';
import styles from './SearchList.module.scss';

class ListPokemonRow extends React.Component {
	render() {
		var pokemonId = this.props.Pokemon.pokemon.url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '');
		var imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemonId + ".png";
		return (
			<div className={styles.row}>
				<div className={styles.rowItem}>{this.props.Pokemon.pokemon.name}</div>
				<div className={styles.rowItem}>{pokemonId}</div>
				<div className={styles.rowItem}>{this.props.Pokemon.pokemon.type}</div>
				<div className={styles.rowItem}>{this.props.Pokemon.pokemon.type2}</div>
				<DetailWrapper  className={styles.rowItem} pokemonNumber={pokemonId} imageUrl={imageUrl} modalManage = {this.props.modalManage} showModal = {this.props.showModal} pokemonCount={this.props.pokemonCount}/>
			</div>
		);
	}
}

class ListPokemonTable extends React.Component {
	
	constructor(props) {
		super(props);
		this.modalManage = this.modalManage.bind(this);
		this.state={pokemonCount: -1,
					pokemonList: [].concat(this.props.Pokemons)}
	}
	static getDerivedStateFromProps(nextProps) {
		if (nextProps.Pokemons.length === 964) {
			return { pokemonList: [].concat(nextProps.Pokemons)
					.sort((a, b) => ((a.pokemon.id > b.pokemon.id) ? 1 : -1)) };
  		}
		return null;
	}
	modalManage(pokemonCount) {
		this.setState({pokemonCount: parseInt(pokemonCount)});
	}
	
	render() {
		const filterText = this.props.filterText;
		const reverse = this.props.reverse;
		const sortAbc = this.props.sortAbc;
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
		rows.push(
			<div className={styles.row}>
				<div className={styles.rowItem}>Name</div>
				<div className={styles.rowItem}>ID</div>
				<div className={styles.rowItem}>Type</div>
				<div className={styles.rowItem}>Type2 (for some)</div>
				<div className={styles.rowItem}>Image</div>
			</div>
		)
		var count = 0;
		var rPokemonList = [].concat(this.state.pokemonList);
		if (sortAbc === true) {
			rPokemonList.sort((a, b) => ((a.pokemon.name > b.pokemon.name) ? 1 : -1));
		} else {
			rPokemonList.sort((a, b) => ((a.pokemon.id > b.pokemon.id) ? 1 : -1));
		}
		if (reverse === true) {
			rPokemonList = rPokemonList.reverse();
		}
		rPokemonList.some((item) => {
			var pokemonId = item.pokemon.url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '');
			if (parseInt(pokemonId) > 10000) {
				return false;
			}
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
			if (count === this.state.pokemonCount) {
				rows.push(
					<ListPokemonRow
						Pokemon={item}
						Type={item.pokemon.type}
						key={pokemonId}
						modalManage={this.modalManage}
						showModal={true}
						pokemonCount={count}
					/>
				);
			} else {
				rows.push(
					<ListPokemonRow
						Pokemon={item}
						Type={item.pokemon.type}
						key={pokemonId}
						modalManage={this.modalManage}
						showModal={false}
						pokemonCount={count}
					/>
				);
			}
			count += 1;
			//return rows.length === 5;
			return false;
		})
		return (
			<div>{rows}</div>
		);
	}
}

ListPokemonTable.propTypes = {
	pokemonCount: PropTypes.number,
	pokemonList: PropTypes.array
}

class ListSearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
		this.handleReverseChange = this.handleReverseChange.bind(this);
		this.handleSortAbcChange = this.handleSortAbcChange.bind(this);
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
	
	handleReverseChange(e) {
		this.props.onReverseChange(e.target.checked);
	}
	
	handleSortAbcChange() {
		this.props.onSortAbcChange();
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
				<input className={styles.inputText}
					type="text"
					placeholder="Search for any pokemon name, number..."
					value={this.props.filterText}
					onChange={this.handleFilterTextChange}
				/>
				<div className={styles.sortClass}>
					<input
						type="radio"
						name="sort"
						checked={this.props.sortAbc}
						onChange={this.handleSortAbcChange}
					/>
					{' '}
					Sort by alphabet
					{' '}
					<input
						type="radio"
						name="sort"
						checked={!this.props.sortAbc}
						onChange={this.handleSortAbcChange}
					/>
					{' '}
					Sort by number
					<input
						type="checkbox"
						checked={this.props.reverse}
						onChange={this.handleReverseChange}
					/>
					{' '}
					Reverse Sort Order
				</div>
				<div className={styles.sortClass}>
					<input
						type="checkbox"
						checked={this.props.normalOnly}
						onChange={this.handleNormalChange}
					/>
					{' '}
					Normal
					{' '}
					<input
						type="checkbox"
						checked={this.props.fightingOnly}
						onChange={this.handleFightingChange}
					/>
					{' '}
					Fighting
					{' '}
					<input
						type="checkbox"
						checked={this.props.flyingOnly}
						onChange={this.handleFlyingChange}
					/>
					{' '}
					Flying
					{' '}
					<input
						type="checkbox"
						checked={this.props.poisonOnly}
						onChange={this.handlePoisonChange}
					/>
					{' '}
					Poison
					{' '}
					<input
						type="checkbox"
						checked={this.props.groundOnly}
						onChange={this.handleGroundChange}
					/>
					{' '}
					Ground
					{' '}
					<input
						type="checkbox"
						checked={this.props.rockOnly}
						onChange={this.handleRockChange}
					/>
					{' '}
					Rock
					{' '}
					<input
						type="checkbox"
						checked={this.props.bugOnly}
						onChange={this.handleBugChange}
					/>
					{' '}
					Bug
					{' '}
					<input
						type="checkbox"
						checked={this.props.ghostOnly}
						onChange={this.handleGhostChange}
					/>
					{' '}
					Ghost
					{' '}
					<input
						type="checkbox"
						checked={this.props.steelOnly}
						onChange={this.handleSteelChange}
					/>
					{' '}
					Steel
					{' '}
					<input
						type="checkbox"
						checked={this.props.fireOnly}
						onChange={this.handleFireChange}
					/>
					{' '}
					Fire
					{' '}
					<input
						type="checkbox"
						checked={this.props.waterOnly}
						onChange={this.handleWaterChange}
					/>
					{' '}
					Water
					{' '}
					<input
						type="checkbox"
						checked={this.props.grassOnly}
						onChange={this.handleGrassChange}
					/>
					{' '}
					Grass
					{' '}
					<input
						type="checkbox"
						checked={this.props.electricOnly}
						onChange={this.handleElectricChange}
					/>
					{' '}
					Electric
					{' '}
					<input
						type="checkbox"
						checked={this.props.psychicOnly}
						onChange={this.handlePsychicChange}
					/>
					{' '}
					Psychic
					{' '}
					<input
						type="checkbox"
						checked={this.props.iceOnly}
						onChange={this.handleIceChange}
					/>
					{' '}
					Ice
					{' '}
					<input
						type="checkbox"
						checked={this.props.dragonOnly}
						onChange={this.handleDragonChange}
					/>
					{' '}
					Dragon
					{' '}
					<input
						type="checkbox"
						checked={this.props.darkOnly}
						onChange={this.handleDarkChange}
					/>
					{' '}
					Dark
					{' '}
					<input
						type="checkbox"
						checked={this.props.fairyOnly}
						onChange={this.handleFairyChange}
					/>
					{' '}
					Fairy
				</div>
			</form>
		);
	}
}

export default class SearchList extends React.Component {
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
					copyList[i].pokemon.id = parseInt(copyList[i].pokemon.url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', ''));
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
						newPokemon.pokemon.id = parseInt(newPokemon.pokemon.url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', ''));
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
			<ListTable
				Pokemons={this.state.pokemonList}
				Type={this.state.type}/>
		);
	}
}

SearchList.propTypes = {
	APIURL: PropTypes.string,
	pokemonList: PropTypes.array
}

class ListTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filterText: '',
			reverse: false,
			sortAbc: false,
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
		this.handleReverseChange = this.handleReverseChange.bind(this);
		this.handleSortAbcChange = this.handleSortAbcChange.bind(this);
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
	
	handleReverseChange(reverse) {
		this.setState({
			reverse: reverse
		})
	}
	
	handleSortAbcChange() {
		this.setState({
			sortAbc: !this.state.sortAbc
		})
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
				<ListSearchBar
					filterText={this.state.filterText}
					sortAbc={this.state.sortAbc}
					onFilterTextChange={this.handleFilterTextChange}
					onReverseChange={this.handleReverseChange}
					onSortAbcChange={this.handleSortAbcChange}
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
				<ListPokemonTable
					Pokemons={this.props.Pokemons}
					Type={this.props.Type}
					filterText={this.state.filterText}
					reverse={this.state.reverse}
					sortAbc={this.state.sortAbc}
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

ListTable.propTypes = {
	reverse: PropTypes.bool,
	sortAbc: PropTypes.bool,
	normalOnly: PropTypes.bool,
	fightingOnly: PropTypes.bool,
	flyingOnly: PropTypes.bool,
	poisonOnly: PropTypes.bool,
	groundOnly: PropTypes.bool,
	rockOnly: PropTypes.bool,
	bugOnly: PropTypes.bool,
	ghostOnly: PropTypes.bool,
	steelOnly: PropTypes.bool,
	fireOnly: PropTypes.bool,
	waterOnly: PropTypes.bool,
	grassOnly: PropTypes.bool,
	electricOnly: PropTypes.bool,
	psychicOnly: PropTypes.bool,
	iceOnly: PropTypes.bool,
	dragonOnly: PropTypes.bool,
	darkOnly: PropTypes.bool,
	fairyOnly: PropTypes.bool
}