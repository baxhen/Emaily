export interface FieldLabels {
  ['Survey Title']: string;
  ['Subject Line']: string;
  ['Email Body']: string;
  ['Recipient List']: string;
}

export interface FieldNames {
  title: string;
  subject: string;
  body: string;
  recipients: string;
}

export const formFields = [
  {
    label: 'Survey Title',
    name: 'title',
    noValueError: 'You must provide a name',
  },
  {
    label: 'Subject Line',
    name: 'subject',
    noValueError: 'You must provide a subject',
  },
  {
    label: 'Email Body',
    name: 'body',
    noValueError: 'You must provide the email body',
  },
  {
    label: 'Recipient List',
    name: 'recipients',
    noValueError: 'You must provide at least one email',
  },
];
