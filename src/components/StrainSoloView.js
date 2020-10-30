import React, { useState, useEffect, useCallback } from 'react';
import StrainSoloCard from './StrainSoloCard';
import StrainExperienceForm from './StrainExperienceForm';
import ExperienceList from './ExperienceList';
import useService from '../services/StrainUseService';
import strainService from '../services/StrainService';

/**
 * View of strain details and logged experiences against that strain.
 * @param {Object} props 
 */
export default function StrainSoloView(props) {
  const { cookies } = props;
  const [strain, setStrain] = useState(props.location.state.strain);
  const [experienceFormOpen, setExperienceFormOpen] = useState(false);
  const [strainUses, setStrainUses] = useState([]);
  const userId = cookies.get("userId");

  const memoFetchStrain = useCallback(async function fetchStrain(strainId) {
    const newStrain = await strainService.getStrainById(strainId);
    setStrain(newStrain);
  }, []);

  const memoFetchUses = useCallback(async function fetchUses(id) {
    const uses = await useService.getUses(id);
    setStrainUses(uses);
  }, []);

  useEffect(() => {
    memoFetchUses(strain.strainId);
    memoFetchStrain(strain.strainId);
  }, [memoFetchStrain, memoFetchUses, strain.strainId]);

  function experiencePosted(strainId) {
    setExperienceFormOpen(false);
    memoFetchUses(strainId);
    memoFetchStrain(strainId);
  }

  return (
    <>
      <StrainSoloCard {...{ strain, experienceFormOpen, setExperienceFormOpen, userId }}></StrainSoloCard>
      <StrainExperienceForm {...{ strain, experienceFormOpen, userId, experiencePosted }}></StrainExperienceForm>
      <ExperienceList {...{ strainUses, userId }}></ExperienceList>
    </>
  );
};