import React from 'react';
import ExperiencePost from './ExperiencePost';

/**
 * Displays all posts or "experiences" logged for a certain strain.
 * @param {Object} props 
 */
export default function ExperienceList(props) {
    const { strainUses, userId } = props;

    return (
        <>
            {strainUses.map(use => {
                return (<ExperiencePost key={use.strainUseId} {...{ use, userId }}></ExperiencePost>)
            })}
        </>
    )

}