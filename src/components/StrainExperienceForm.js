import React, { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import useService from '../services/StrainUseService';
import ratingService from '../services/StrainRatingService';
import confirmationService from '../services/ConfirmationService';

/**
 * Form used to log an experience with a strain.
 * @param {Object} props 
 */
export default function StrainExperienceForm(props) {
    const { strain, experienceFormOpen, userId, experiencePosted } = props
    const [experienceDescription, setExperienceDescription] = useState('');
    const [symptomsExperienced, setSymptomsExperienced] = useState([]);
    const [flavorsExperienced, setFlavorsExperienced] = useState([]);
    const [formRating, setFormRating] = useState(5);

    async function postExperience() {
        const use = await useService.addUse({
            userId,
            strainId: strain.strainId,
            description: experienceDescription,
        });
        await ratingService.addRating({
            userId,
            strainId: strain.strainId,
            rating: formRating,
            strainUseId: use.strainUseId
        });
        await confirmationService.postSymptomConfirmations(strain.strainId, symptomsExperienced, use.strainUseId, true);
        await confirmationService.postFlavorConfirmations(strain.strainId, flavorsExperienced, use.strainUseId, true);
        experiencePosted(strain.strainId);
    }

    function selectChange(e, input) {
        var options = e.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        switch (input) {
            case 'symptom':
                setSymptomsExperienced(value);
                break;
            case 'flavor':
                setFlavorsExperienced(value);
                break;
            default:
        }
    }

    return (
        <div className="container-fluid mt-1 mb-2">
            <Collapse in={experienceFormOpen}>
                <form>
                    <div className="form-group">
                        <label htmlFor="inputContent">Experience:</label>
                        <textarea value={experienceDescription} onChange={e => setExperienceDescription(e.target.value)}
                            rows="3" type="text" className="form-control" id="inputContent" />
                        <small id="contentHelp" className="form-text text-muted">Please describe your experience with this strain.</small>
                    </div>
                    <div className="form-group">
                        <div className="form-group">
                            <label htmlFor="symptomCheck">Symptoms:</label>
                            <select multiple className="form-control" id="symptomCheck" onChange={(e) => selectChange(e, 'symptom')}>
                                {strain.symptoms.map(symptom => {
                                    return (
                                        <option key={symptom.symptomId} value={symptom.symptomId}>{symptom.name}</option>
                                    )
                                })}
                            </select>
                            <small id="symptomHelp" className="form-text text-muted">Select all symptoms you have experienced.</small>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-group">
                            <label htmlFor="flavorCheck">Flavors:</label>
                            <select multiple className="form-control" onChange={(e) => selectChange(e, 'flavor')} id="flavorCheck">
                                {strain.flavors.map(flavor => {
                                    return (
                                        <option key={flavor.flavorId} value={flavor.flavorId}>{flavor.name}</option>
                                    )
                                })}
                            </select>
                            <small id="flavorHelp" className="form-text text-muted">Select all flavors you have experienced.</small>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-group">
                            <label htmlFor="rating">Rating:</label>
                            <select value={formRating} onChange={(e) => setFormRating(e.target.value)} className="form-control" id="rating">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <small id="rateHelp" className="form-text text-muted">Rate your overall experience</small>
                        </div>
                    </div>
                    <button onClick={postExperience} type="button" className="btn btn-success btn-block">Post</button>
                </form>
            </Collapse>
        </div>
    )
}