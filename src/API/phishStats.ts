const baseURL = 'https://phishstats.info:2096/api/phishing';

/*

+---------------------------+-----------------------------------------------------------------------------------+
| Example                   | Key | Value                                                                       |
+---------------------------+-----------------------------------------------------------------------------------+
| Id                        | /api/phishing?_where=(id,eq,3296584)                                              |
| ASN                       | /api/phishing?_where=(asn,eq,as14061)                                             |
| IP                        | /api/phishing?_where=(ip,eq,148.228.16.3)                                         |
| CountryCode               | /api/phishing?_where=(countrycode,eq,US)                                          |
| TLD                       | /api/phishing?_where=(tld,eq,US)                                                  |
| Id DESC                   | /api/phishing?_sort=-id                                                           |
| Date DESC                 | /api/phishing?_sort=-date                                                         |
| Title with Id DESC        | /api/phishing?_where=(title,like,~apple~)&_sort=-id                               |
| URL with Id DESC          | /api/phishing?_where=(url,like,~apple~)&_sort=-id                                 |
| Title or URL with Id DESC | /api/phishing?_where=(title,like,~apple~)~or(url,like,~apple~)&_sort=-id          |
| 'and' options             | /api/phishing?_where=(score,gt,5)~and(tld,eq,br)~and(countrycode,ne,br)&_sort=-id |
+---------------------------+-----------------------------------------------------------------------------------+

*/

export const API = {
  async getStats(
    request: Phishing.Request,
    additionalRules: { sort: keyof Phishing.Item; limit: number }
  ) {
    const req = buildRequest(request, {
      sort: additionalRules.sort,
      limit: additionalRules.limit,
    });

    const response = await fetch(req, {
      headers: {
        Accept: 'application/json',
      },
    });

    return await response.json();
  },

  async getStatsByRawRequest(req: string) {
    const url = new URL(`${baseURL}?${req}`);

    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
    });

    return await response.json();
  },
};

export const keysForSearch = [
  'url',
  'ip',
  'countryname',
  'id',
  'countrycode',
  'regioncode',
  'regionname',
  'city',
  'zipcode',
  'latitude',
  'longitude',
  'asn',
  'bgp',
  'isp',
  'title',
  'date',
  'date_update',
  'hash',
  'score',
  'host',
  'domain',
  'tld',
  'domain_registered_n_days_ago',
  'screenshot',
  'abuse_contact',
  'ssl_issuer',
  'ssl_subject',
  'alexa_rank_host',
  'alexa_rank_domain',
  'n_times_seen_ip',
  'n_times_seen_host',
  'n_times_seen_domain',
  'http_code',
  'http_server',
  'google_safebrowsing',
  'virus_total',
  'abuse_ch_malware',
  'threat_crowd',
  'threat_crowd_subdomain_count',
  'threat_crowd_votes',
  'vulns',
  'ports',
  'os',
  'tags',
  'technology',
  'page_text',
];

export const explanations = [
  ['url', 'Uniform Resource Locator (URL) of the resource.'],
  ['ip', 'Internet Protocol (IP) address of the resource.'],
  ['countryname', 'Name of the country associated with the resource.'],
  ['id', 'Identifier or unique identification of the resource.'],
  ['countrycode', 'Country code associated with the resource.'],
  ['regioncode', 'Region code associated with the resource.'],
  ['regionname', 'Name of the region associated with the resource.'],
  ['city', 'Name of the city associated with the resource.'],
  ['zipcode', 'Postal code associated with the resource.'],
  ['latitude', 'Geographical latitude coordinates of the resource.'],
  ['longitude', 'Geographical longitude coordinates of the resource.'],
  ['asn', 'Autonomous System Number (ASN) associated with the resource.'],
  [
    'bgp',
    'Border Gateway Protocol (BGP) information associated with the resource.',
  ],
  ['isp', 'Internet Service Provider (ISP) associated with the resource.'],
  ['title', 'Title or name associated with the resource.'],
  ['date', 'Date information related to the resource.'],
  ['date_update', 'Date when the resource was last updated.'],
  ['hash', 'Hash value associated with the resource.'],
  ['score', 'Score or rating assigned to the resource.'],
  ['host', 'Host information associated with the resource.'],
  ['domain', 'Domain name associated with the resource.'],
  ['tld', 'Top-Level Domain (TLD) associated with the resource.'],
  [
    'domain_registered_n_days_ago',
    'Number of days ago the domain was registered.',
  ],
  ['screenshot', 'Screenshot or visual representation of the resource.'],
  [
    'abuse_contact',
    'Contact information for reporting abuse related to the resource.',
  ],
  [
    'ssl_issuer',
    'Issuer information for SSL (Secure Sockets Layer) associated with the resource.',
  ],
  [
    'ssl_subject',
    'Subject information for SSL (Secure Sockets Layer) associated with the resource.',
  ],
  ['alexa_rank_host', 'Alexa rank associated with the host.'],
  ['alexa_rank_domain', 'Alexa rank associated with the domain.'],
  ['n_times_seen_ip', 'Number of times the IP address has been seen.'],
  ['n_times_seen_host', 'Number of times the host has been seen.'],
  ['n_times_seen_domain', 'Number of times the domain has been seen.'],
  ['http_code', 'HTTP response code associated with the resource.'],
  ['http_server', 'HTTP server information associated with the resource.'],
  [
    'google_safebrowsing',
    'Google Safe Browsing information associated with the resource.',
  ],
  ['virus_total', 'VirusTotal information associated with the resource.'],
  [
    'abuse_ch_malware',
    'Abuse.ch Malware Tracker information associated with the resource.',
  ],
  ['threat_crowd', 'ThreatCrowd information associated with the resource.'],
  [
    'threat_crowd_subdomain_count',
    'Number of subdomains associated with ThreatCrowd.',
  ],
  [
    'threat_crowd_votes',
    'Number of votes or ratings associated with ThreatCrowd.',
  ],
  ['vulns', 'Vulnerabilities information associated with the resource.'],
  ['ports', 'Ports information associated with the resource.'],
  ['os', 'Operating system information associated with the resource.'],
  ['tags', 'Tags or labels associated with the resource.'],
  ['technology', 'Technology information associated with the resource.'],
  ['page_text', 'Text content extracted from the webpage of the resource.'],
];

function buildRequest(
  request: Phishing.Request,
  additionalRules: { sort: keyof Phishing.Item; limit: number }
): URL {
  const url = new URL(baseURL);
  let req = '';

  request.forEach((requestItem) => {
    if ('field' in requestItem) {
      req += `(${requestItem.field},${requestItem.method || 'eq'},${requestItem.value})`;
    } else {
      req += `~${requestItem.value}`;
    }
  });

  if (req) url.searchParams.append('_where', req);
  if (additionalRules.sort)
    url.searchParams.append('_sort', `-${additionalRules.sort}`);

  url.searchParams.append('_size', `${additionalRules.limit || '20'}`);

  return url;
}
