Expression = expr:((Where '&')? Sort?) {
  return expr.flat(2).filter(i => i !== '&');
}

Where = '_where=' value:WhereContent {
  return {
    type: 'where',
    value,
    // location: location(),
  }
};

WhereContent
  = rules:((WhereRule Separator '(' WhereContent ')') / (WhereRule (Separator WhereRule)*)) {
    return rules.filter(r => r !== '(' && r !== ')');
};

WhereRule =
  ('(' Field ',' Operator ',' [^)]+ ')') { return text() };

Sort =
  '_sort=' direction:'-'? sort:Field {
    return {
      type: 'sort',
      value: {
        columnName: sort,
        direction: direction === '-' ? 'dec' : 'inc',
      },
      // location: location(),
    }
  };

Field =
  'id' / 'url' / 'ip' / 'countrycode' / 'countryname' / 'regioncode' / 'regionname' / 'city' / 'zipcode' / 'latitude' / 'longitude' / 'asn' / 'bgp' / 'isp' / 'title' / 'date' / 'date_update' / 'hash' / 'score' / 'host' / 'domain' / 'tld' / 'domain_registered_n_days_ago' / 'screenshot' / 'abuse_contact' / 'ssl_issuer' / 'ssl_subject' / 'alexa_rank_host' / 'alexa_rank_domain' / 'n_times_seen_ip' / 'n_times_seen_host' / 'n_times_seen_domain' / 'http_code' / 'http_server' / 'google_safebrowsing' / 'virus_total' / 'abuse_ch_malware' / 'threat_crowd' / 'threat_crowd_subdomain_count' / 'threat_crowd_votes' / 'vulns' / 'ports' / 'os' / 'tags' / 'technology' / 'page_text';

Operator
  = 'eq' / 'ne' / 'gt' / 'gte' / 'lt' / 'lte' / 'is' / 'in' / 'bw' / 'like' / 'nlike';
 
 Separator
  = '~' val:('or' / 'and' / 'xor') { return val };



/*
  Issule:
    input:
      _where=(score,gt,5)~or((id,eq,1)~and((id,eq,1)~or(ip,eq,123)~and(ip,eq,123)))

    expect:
      [
        {
          type: 'where',
          value: [
            '(score,gt,5)',
            'or',
            [
              '(id,eq,1)',
              'and',
              [
                '(id,eq,1)',
                'or',
                [
                  '(ip,eq,123)'
                  'and',
                  '(ip,eq,123)'
                ]
              ]
            ]
          ]
        }
      ]

    output:
      [
        {
          type: 'where',
          value: [
            '(score,gt,5)',
            'or',
            [
              '(id,eq,1)',
              'and',
              [
                '(id,eq,1)',
                [
                  [
                    'or',
                    '(ip,eq,123)'
                  ],
                  [
                    'and',
                    '(ip,eq,123)'
                  ]
                ]
              ]
            ]
          ]
        }
      ]
*/