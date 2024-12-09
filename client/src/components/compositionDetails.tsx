import React from 'react';
import CompositionCard, { CompositionProps } from './compositionCard';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_COMPOSITIONS } from '../utils/queries';
import { SAVE_TO_LIBRARY } from '../utils/mutations';


interface CompositionDetailProps {
    composition: CompositionProps;
}


const CompositionDetails: React.FC<CompositionDetailProps> = () => {
    const navigate = useNavigate(); //Used to navigate between pages
    const { compositionId } = useParams<{ compositionId: string }>(); // Retrieve the composition ID from the URL


    // Fetch the composition data using the QUERY_COMPOSITION query
    const { loading, error, data } = useQuery(QUERY_COMPOSITIONS, {
        variables: { id: compositionId },
    });
}