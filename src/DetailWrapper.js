import PropTypes from 'prop-types';
import React from 'react';
import axios from 'axios';
import styles from './DetailWrapper.module.scss';

export default class DetailWrapper extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			pokemonNumber: parseInt(this.props.pokemonNumber)
		};
	}
	
	modalOn(event) {
		this.props.modalManage(this.props.pokemonCount);
	}

	modalOff(event) {
		this.props.modalManage(-1);
	}
	
	nextModal(event) {
		this.props.modalManage(this.props.pokemonCount + 1);
	}
	
	prevModal(event) {
		this.props.modalManage(this.props.pokemonCount - 1);
	}
	
	render() {
		return (
			<div className={styles.sb} >
				<div>
					<SpriteButton number={this.props.pokemonNumber} buttonClick={this.modalOn.bind(this)}/>
				</div>
				<div>
					<MyModal className={styles.modals} modalOff = {this.modalOff.bind(this)} showModal = {this.props.showModal}
							pokemonCount = {this.props.pokemonCount} pokemonNumber={this.props.pokemonNumber} modalManage = {this.props.modalManage} nextModal={this.nextModal.bind(this)} prevModal={this.prevModal.bind(this)}/>
				</div>
			</div>
		);
	}
}

DetailWrapper.propTypes = {
	pokemonNumber: PropTypes.string
};

class SpriteButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			number: this.props.number
		};
	}
	
	render() {
		var imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + this.state.number + ".png";
		return (
			<div className="medal">
				<span className="medalButton" id={this.state.number} onClick={this.props.buttonClick}>
					<img src={imageUrl} alt={this.state.number + " image"}/>
				</span>
			</div>
		);
	}
}

SpriteButton.propTypes = {
	number: PropTypes.string
};

class DetailModal extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			pokemonName: "",
			pokemonHeight: 0,
			pokemonWeight: 0,
			pokemonSpeed: 0,
			pokemonSpecialDefense: 0,
			pokemonSpecialAttack: 0,
			pokemonDefense: 0,
			pokemonAttack: 0,
			pokemonHp: 0,
			pokemonAB1: "",
			pokemonAB2: ""
		};
		this.modalManage = this.modalManage.bind(this);
	}
	
	modalManage() {
		this.props.modalManage(this.props.pokemonCount);
	}
	
	componentDidMount() {
		var apiUrl = "https://pokeapi.co/api/v2/pokemon/" + this.props.pokemonNumber;
		axios.get(apiUrl)
		  .then(res => {
			var pokemonName = res.data.name;
			var pokemonHeight = res.data.height;
			var pokemonWeight = res.data.weight;
			var pokemonStats = res.data.stats;
			var pokemonSpeed = pokemonStats[0].base_stat;
			var pokemonSpecialDefense = pokemonStats[1].base_stat;
			var pokemonSpecialAttack = pokemonStats[2].base_stat;
			var pokemonDefense = pokemonStats[3].base_stat;
			var pokemonAttack = pokemonStats[4].base_stat;
			var pokemonHp = pokemonStats[5].base_stat;
			var pokemonAbilities = res.data.abilities;
			console.log(pokemonAbilities);
			var pokemonAB1 = pokemonAbilities[0].ability.name;
			var pokemonAB2;
			if (pokemonAbilities.length < 2) {
				pokemonAB2 = "no";
			}
			else {
				pokemonAB2 = pokemonAbilities[1].ability.name;
			}
			this.setState({ pokemonName: pokemonName,
						  	pokemonHeight: pokemonHeight,
						  	pokemonWeight: pokemonWeight,
						  	pokemonSpeed: pokemonSpeed,
						  	pokemonSpecialDefense: pokemonSpecialDefense,
						  	pokemonSpecialAttack: pokemonSpecialAttack,
						  	pokemonDefense: pokemonDefense,
						  	pokemonAttack: pokemonAttack,
						  	pokemonHp: pokemonHp,
						  	pokemonAB1: pokemonAB1,
						  	pokemonAB2: pokemonAB2});
		  });
	}
	
	getPokemonName(pokemonNumber) {
		var apiUrl = "https://pokeapi.co/api/v2/pokemon/" + pokemonNumber;
		var pokemonName = "";
		axios.get(apiUrl)
		  .then(res => {
			pokemonName = res.data.name;
			this.setState({ pokemonName: pokemonName});
			});
	};
	
	ability() {
		if (this.state.pokemonAB2 !== "no") {
			return (
				<div className="modal-text-silver">
					ability: {this.state.pokemonAB1} and {this.state.pokemonAB2}
				</div>
			);
		} else {
			return (
				<div className="modal-text-silver">
					ability: {this.state.pokemonAB1}
				</div>
			);
		}
	}
	
	render() {
		var imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + this.props.pokemonNumber.toString() + ".png";
		var imageShinyUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/" + this.props.pokemonNumber.toString() + ".png";
		return (
			<div className="modal-flex">
				<div className="modal-content">
					<img src={imageUrl} alt={this.state.pokemonName}/>
					<img src={imageShinyUrl} alt={this.state.pokemonName}/>
					<div className="modal-text-gold">
						{this.state.pokemonName}
					</div>
					<div className="modal-text-gold">
						{this.props.pokemonNumber}
					</div>
					{this.ability()}
					<div className={styles.textWrapper}>
						<div>
							<div className="modal-text-bronze">
								height: {this.state.pokemonHeight}
							</div>
							<div className="modal-text-bronze">
								weight: {this.state.pokemonWeight}
							</div>
						</div>
						<div>
							<div className="modal-text-bronze">
								speed: {this.state.pokemonSpeed}
							</div>
							<div className="modal-text-bronze">
								HP: {this.state.pokemonHp}
							</div>
						</div>
						<div>
							<div className="modal-text-bronze">
								attack: {this.state.pokemonAttack}     
							</div>
							<div className="modal-text-bronze">
								defense: {this.state.pokemonDefense}     
							</div>
						</div>
						<div>
							<div className="modal-text-bronze">
								special attack: {this.state.pokemonSpecialAttack}     
							</div>
							<div className="modal-text-bronze">
								special defense: {this.state.pokemonSpecialDefense}
							</div>
						</div>
					</div>
					<div className={styles.textWrapper}>
						<span className={styles.buttons} onClick={this.props.prevModal}>
							Previous
						</span>
						<span className={styles.buttons} onClick={this.props.nextModal}>
							Next
						</span>
						<span className={styles.buttons} onClick={this.props.modalOff}>
							Close
						</span>
					</div>
				</div>
			</div>
		);
	}
}

DetailModal.propTypes = {
	pokemonHeight: PropTypes.number,
	pokemonWeight: PropTypes.number,
	pokemonSpeed: PropTypes.number,
	pokemonSpecialDefense: PropTypes.number,
	pokemonSpecialAttack: PropTypes.number,
	pokemonDefense: PropTypes.number,
	pokemonAttack: PropTypes.number,
	pokemonHp: PropTypes.number,
	pokemonAB1: PropTypes.string,
	pokemonAB2: PropTypes.string,
}

class MyModal extends React.Component {
	
	render() {
		if (this.props.showModal === true) {
			return (
				<div>
					<div className="modal-clicked">
						<DetailModal pokemonNumber={this.props.pokemonNumber} pokemonCount={this.props.pokemonCount} nextModal = {this.props.nextModal} prevModal={this.props.prevModal} modalManage={this.props.modalManage} modalOff = {this.props.modalOff}/>
					</div>
				</div>
			);
		}
		else {
			return (
				<div>
					{null}
				</div>
			);
		}
	}
}
