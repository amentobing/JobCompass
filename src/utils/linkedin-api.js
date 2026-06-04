import 'dotenv/config';
import axios from 'axios';

const dotenv = process.env;
const apiKeys = [dotenv.rapidkey_1, dotenv.rapidkey_2, dotenv.rapidkey_3, dotenv.rapidkey_4, dotenv.rapidkey_5];

export const linkedinAPI = async (title) => {
  for (const key of apiKeys) {
    if (!key) continue;

    const options = {
      method: 'GET',
      url: 'https://linkedin-job-search-api.p.rapidapi.com/active-jb-1h',
      params: {
        offset: 0,
        title_filter: title,
        description_type: 'html',
      },
      headers: {
        'x-rapidapi-key': key,
        'x-rapidapi-host': process.env.rapidhost,
        'Content-Type': 'application/json',
      },
    };

    try {
      const result = await axios(options);

      if (result.status === 200) {
        let rawData = result.data;

        if (!Array.isArray(rawData)) {
          if (rawData && Array.isArray(rawData.data)) {
            rawData = rawData.data;
          } else {
            throw new Error('Terjadi Kesalahan Pada API');
          }
        }

        const jobs = rawData.map((job) => {
          return {
            title: job?.title || 'No Title',
            organization: job?.organization || 'No Organization',
            location: job?.locations_derived?.length > 0 ? job.locations_derived[0] : 'No Location',
            countries: job?.countries_derived?.length > 0 ? job.countries_derived[0] : 'No Country',
            description: job?.description_html || 'No Description',
            link: job?.url || '',
            organizationData: {
              url: job?.linkedin_org_url || '',
              employees: job?.linkedin_org_employees || 0,
              slogan: job?.linkedin_org_slogan || '',
              industry: job?.linkedin_org_industry || '',
              spesialities: job?.linkedin_org_specialties || [],
              location: job?.linkedin_org_locations || [],
              description: job?.linkedin_org_description || '',
              followers: job?.linkedin_org_followers || 0,
            },
          };
        });
        return jobs;
      }
    } catch (error) {
      new Error('Linkedin API Error\n' + error);
      continue;
    }
  }
  return null;
};
