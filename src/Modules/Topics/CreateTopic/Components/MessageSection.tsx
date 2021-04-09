import {
  TextVariants,
  Text,
  TextContent,
  Form,
  Stack,
  Title,
} from '@patternfly/react-core';
import React from 'react';
import {
  DropdownWithToggle,
  IDropdownOption,
} from '../../../../Components/DropdownWithToggle';
import { FormGroupWithPopover } from '../../../../Components/FormGroupWithPopover/FormGroupWithPopover';
import { kebabToDotSeparated } from '../utils';
import { TopicContext } from '../../../../Contexts/Topic';
import { SizeTimeFormGroup } from '../../../../Components/SizeTimeFormGroup/SizeTimeFormGroup';
import { useTranslation } from 'react-i18next';

const timeStampOptions: IDropdownOption[] = [
  { key: 'create-time', value: 'CreateTime', isDisabled: false },
  { key: 'log-append-time', value: 'LogAppendTime', isDisabled: false },
];

const messageCompressionTypes: IDropdownOption[] = [
  { key: 'Producer', value: 'Producer', isDisabled: false },
  { key: 'Gzip', value: 'Gzip', isDisabled: false },
  { key: 'Snappy', value: 'Snappy', isDisabled: false },
  { key: 'LZ4', value: 'LZ4', isDisabled: false },
  { key: 'Zstandard', value: 'Zstandard', isDisabled: false },
  { key: 'Uncompressed', value: 'Uncompressed', isDisabled: false },
];

const MessageSection: React.FC = () => {
  const { store, updateStore } = React.useContext(TopicContext);

  const { t } = useTranslation();

  const handleTouchSpinInputChange = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const { name: fieldName, value } = event.currentTarget;
    updateStore(kebabToDotSeparated(fieldName), Number(value));
  };

  const handleTouchSpinPlus = (event) => {
    const { name } = event.currentTarget;
    const fieldName = kebabToDotSeparated(name);
    updateStore(fieldName, Number(store[fieldName]) + 1);
  };

  const handleTouchSpinMinus = (event) => {
    const { name } = event.currentTarget;
    const fieldName = kebabToDotSeparated(name);
    updateStore(fieldName, Number(store[fieldName]) - 1);
  };

  const onDropdownChange = (value: string, event) => {
    const { name: fieldName } = event.target;
    updateStore(kebabToDotSeparated(fieldName), value);
  };

  const onDropdownChangeDotSeparated = (value: string, event) => {
    const { name: fieldName } = event.target;
    updateStore(kebabToDotSeparated(fieldName), value);
  };

  return (
    <Stack hasGutter>
      <TextContent>
        <Title headingLevel='h2' size='xl' id='messages' tabIndex={-1}>
          Messages
        </Title>
        <Text component={TextVariants.p}>
          {t('createTopic.messageSectionInfo')}
        </Text>
      </TextContent>
      <Form>
        <FormGroupWithPopover
          fieldId='maxsize'
          fieldLabel='Maximum message size'
          labelHead={t('createTopic.maxMessageSizeLabelHead')}
          labelBody={t('createTopic.maxMessageSizeLabelBody')}
          buttonAriaLabel='More info for maximum message size field'
        >
          <SizeTimeFormGroup
            inputName='max-message-bytes'
            onChange={handleTouchSpinInputChange}
            onPlus={handleTouchSpinPlus}
            onMinus={handleTouchSpinMinus}
            value={Number(store['max.message.bytes'])}
            plusBtnProps={{ name: 'max-message-bytes' }}
            minusBtnProps={{ name: 'max-message-bytes' }}
            id='msg-section-units-dropdown'
            toggleId='msg-section-units-dropdowntoggle'
            ariaLabel='select unit from dropdown'
            onSelectOption={onDropdownChange}
            type='memory'
            name='max-message-bytes-unit'
            dropdownValue={store['max.message.bytes.unit']}
          />
        </FormGroupWithPopover>
        <FormGroupWithPopover
          fieldId='timestamp'
          fieldLabel='Message timestamp type'
          labelHead={t('createTopic.messageTimestampLabelHead')}
          labelBody={t('createTopic.messageTimestampLabelBody')}
          buttonAriaLabel='More info for message timestamp field'
        >
          <DropdownWithToggle
            id='msg-section-timestamp-dropdown'
            toggleId='msg-section-timestamp-dropdowntoggle'
            ariaLabel='select timestamp type from dropdown'
            name='message-timestamp-type'
            onSelectOption={onDropdownChangeDotSeparated}
            items={timeStampOptions}
            value={store['message.timestamp.type'] || ''}
          />
        </FormGroupWithPopover>
        <FormGroupWithPopover
          fieldId='max-difference'
          fieldLabel='Message timestamp difference'
          labelHead={t('createTopic.messageTimestampDiffLabelHead')}
          labelBody={t('createTopic.messageTimestampDiffLabelBody')}
          buttonAriaLabel='More info for maximum message timestamp difference field'
        >
          <SizeTimeFormGroup
            inputName='message-timestamp-difference-max-ms'
            onChange={handleTouchSpinInputChange}
            onPlus={handleTouchSpinPlus}
            onMinus={handleTouchSpinMinus}
            value={Number(store['message.timestamp.difference.max.ms'])}
            plusBtnProps={{ name: 'message-timestamp-difference-max-ms' }}
            minusBtnProps={{ name: 'message-timestamp-difference-max-ms' }}
            id='msg-section-timestamp-diff-units-dropdown'
            toggleId='msg-section-timestamp-diff-units-dropdowntoggle'
            ariaLabel='select unit from dropdown'
            onSelectOption={onDropdownChange}
            type='time'
            name='message-timestamp-difference-max-ms-unit'
            dropdownValue={store['message.timestamp.difference.max.ms.unit']}
          />
        </FormGroupWithPopover>
        <FormGroupWithPopover
          fieldId='compression-type'
          fieldLabel='Compression type'
          labelHead={t('createTopic.compressionTypeLabelHead')}
          labelBody={t('createTopic.compressionTypeLabelBody')}
          buttonAriaLabel='More info for comprssion type field'
        >
          <DropdownWithToggle
            id='compression-type'
            toggleId='msg-section-compression-type-dropdowntoggle'
            ariaLabel='select timestamp type from dropdown'
            name='compression-type'
            onSelectOption={onDropdownChangeDotSeparated}
            items={messageCompressionTypes}
            value={store['compression.type'] || ''}
          />
        </FormGroupWithPopover>
      </Form>
    </Stack>
  );
};

export { MessageSection };