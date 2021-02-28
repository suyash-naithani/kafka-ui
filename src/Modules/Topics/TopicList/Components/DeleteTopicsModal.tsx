import React, { useContext, useState } from 'react';
import {
  Modal,
  ModalVariant,
  Button,
  Text,
  AlertVariant,
  TextInput,
} from '@patternfly/react-core';
import { deleteTopic } from '../../../../Services/TopicServices';
import { ConfigContext } from '../../../../Contexts';
import { AlertContext } from '../../../../Contexts/Alert/Context';
import { useTranslation } from 'react-i18next';

export interface IDeleteTopics {
  setDeleteModal: (value: boolean) => void;
  deleteModal: boolean;
  topicName?: string;
  onDeleteTopic: () => void;
}
export const DeleteTopics: React.FunctionComponent<IDeleteTopics> = ({
  setDeleteModal,
  deleteModal,
  topicName,
  onDeleteTopic,
}) => {
  const [verificationText, setVerificationText] = useState<string>('');
  const { addAlert } = useContext(AlertContext);
  const onClose = () => {
    setDeleteModal(false);
  };

  const { t } = useTranslation();

  const onDelete = async () => {
    try {
      topicName && (await deleteTopic(topicName, config));
      addAlert(`Successfully deleted topic ${topicName}`, AlertVariant.success);
    } catch (err) {
      addAlert(err.response.data.error_message, AlertVariant.danger);
    }
    onDeleteTopic();
    setDeleteModal(false);
  };

  const config = useContext(ConfigContext);

  const handleVerificationTextChange = (value) => {
    setVerificationText(value);
  };

  return (
    <Modal
      variant={ModalVariant.small}
      isOpen={deleteModal}
      aria-label={t('topicList.deleteModalTitle')}
      title={t('topicList.deleteModalTitle')}
      titleIconVariant='warning'
      showClose={true}
      aria-describedby='modal-message'
      onClose={onClose}
      actions={[
        <Button
          variant='danger'
          onClick={onDelete}
          key={1}
          data-testid='modalDeleteTopic-buttonDelete'
          isDisabled={verificationText.toUpperCase() != 'DELETE'}
        >
          {t('common.delete')}
        </Button>,
        <Button variant='link' onClick={onClose} key={2}>
          {t('common.cancel')}
        </Button>,
      ]}
    >
      <Text id='modal-message'>
        {' '}
        <b>{topicName}</b> will be deleted.{' '}
      </Text>

      <br />
      <label htmlFor='delete-text-input'>Type DELETE to confirm:</label>
      <TextInput
        value={verificationText}
        id='delete-text-input'
        name='delete-text-input'
        type='text'
        onChange={handleVerificationTextChange}
        autoFocus={true}
      />
    </Modal>
  );
};
