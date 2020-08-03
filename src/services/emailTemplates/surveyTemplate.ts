import * as env from '../../config/keys';
import { Keys } from '../../server';
const { redirectDomain } = env as Keys;
export const surveyTemplate = (survey: any) => {
  return `
  <html>
    <body>
      <div style="text-align: center">
        <h3>I'd like your input!</h3>
        <p>Pleas answer the following question:</p>
        <p>${survey.body}</p>
        <div>
          <a href="${redirectDomain}/api/surveys/${survey.id}/yes">Yes</a>
        </div>
        <div>
          <a href="${redirectDomain}/api/surveys/${survey.id}/no">No</a>
        </div>
      </div>
    </body>
  </html>
    `;
};
