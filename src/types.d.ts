declare namespace Phishing {
  export interface Item {
    id: number; // 1
    url: string; //"http://000gbf1.wcomhost.com/3K8D4N2/index.php",
    ip: string; // "208.91.197.27",
    countrycode: string; // "US",
    countryname: string; // "United States",
    regioncode: string; // '';
    regionname: string; // '';
    city: string; // '';
    zipcode: string; // '';
    latitude: string; // '38';
    longitude: string; // '-97.82200000';
    asn: string; // 'AS40034';
    bgp: string; // '208.91.196.0/23';
    isp: string; // 'CONFLUENCE-NETWORK-INC - Confluence Networks Inc, VG';
    title: string | null; // null;
    date: string; // '2017-02-04T02:00:00.000Z';
    date_update: string; // '2020-12-08T01:50:24.000Z';
    hash: string; // '2d0796d76d0bc902c2df3553198df2ed4e86f8117101f09138c2c89b3cf48456';
    score: number | null; // null
    host: string; // '000gbf1.wcomhost.com';
    domain: string | null; // null
    tld: string; // 'com';
    domain_registered_n_days_ago: number | null; // null
    screenshot?: {
      type: 'Buffer';
      data: Buffer;
    } | null; // null
    abuse_contact: string | null; // null;
    ssl_issuer: string | null; // null;
    ssl_subject: string | null; // null;
    alexa_rank_host: number | null; // null;
    alexa_rank_domain: number | null; // null;
    n_times_seen_ip: number | null; // null;
    n_times_seen_host: number | null; // null;
    n_times_seen_domain: number | null; // null;
    http_code: number | null; // null;
    http_server: string | null; // null;
    google_safebrowsing: unknown | null; // null;
    virus_total: unknown | null; // null;
    abuse_ch_malware: unknown | null; // null;
    threat_crowd: unknown | null; // null;
    threat_crowd_subdomain_count: unknown | null; // null;
    threat_crowd_votes: unknown | null; // null;
    vulns: unknown | null; // null;
    ports: unknown | null; // null;
    os: unknown | null; // null;
    tags: unknown | null; // null;
    technology: unknown | null; // null;
    page_text: string | null; // '   ';
  }

  export interface Ruler {
    field: string;
    value: string;
    method?: 'like' | 'eq';
  }

  export interface Joiner {
    value: 'and' | 'or';
  }

  export type Request = (Ruler | Joiner)[];
}
