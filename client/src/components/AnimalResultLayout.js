import * as React from 'react';

import AnimalCard from './AnimalCard';

export default function AnimalResultLayout(props) {
	console.log(props.animals, 'from animalresults');

	return (
		//need a conditional here for when props.animals.animals is empty, cant iterate through undefined
		//why arent images rendering
		<div className='animal-results'>
	

			{props.animals.length > 0 &&
				props.animals.map((animal) => {
					return <AnimalCard key={animal.id} animal={animal} />;
				})}
		</div>
	);
}
