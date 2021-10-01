import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import './PlaceForm.css';

const UpdatePlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const placeId = useParams().placeId;
  const [loadedPlace, setLoadedPlace] = useState();
  const history = useHistory();

  const [formState, inputHandler, setFormDataHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/places/${placeId}`
      ).then(responseData => {
        setLoadedPlace(responseData.place);
        setFormDataHandler(
          {
            title: {
              value: responseData.place.title,
              isValid: true
            },
            description: {
              value: responseData.place.description,
              isValid: true
            }
          },
          true
        );
      });
    };
    fetchPlace();
  }, [setFormDataHandler, sendRequest, placeId]);

  if (isLoading) {
    return (
      <div className='center'>
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPlace && !error) {
    return (
      <div className='center'>
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  const placeUpdateSubmitHandler = async event => {
    event.preventDefault();
    sendRequest(
      `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
      'PATCH',
      {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + auth.token
      },
      JSON.stringify({
        title: formState.inputs.title.value,
        description: formState.inputs.description.value
      })
    ).then(res => history.push(`/${auth.userId}/places`));
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlace && (
        <form className='place-form' onSubmit={placeUpdateSubmitHandler}>
          <Input
            element='input'
            type='text'
            label='Title'
            id='title'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid title.'
            onInput={inputHandler}
            initialValue={loadedPlace.title}
            initialValid={true}
          />

          <Input
            id='description'
            element='textarea'
            label='Description'
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText='Please enter a valid description (at least 5 characters)'
            onInput={inputHandler}
            initialValue={loadedPlace.description}
            initialValid={true}
          />

          <Button type='submit' disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdatePlace;
