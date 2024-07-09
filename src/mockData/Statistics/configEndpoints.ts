const subarrayList = ['01'];

const subarrayDetail = {
  eb_id: 'eb-test-20240415-21626',
  last_command: 'Scan',
  last_command_time: '2024-04-15T07:07:36+00:00',
  obs_state_commanded: 'SCANNING',
  resources: {
    csp_links: [1, 2, 3, 4],
    receive_nodes: 1,
    receptors: [
      'C1',
      'C2',
      'C3',
      'C4',
      'C5',
      'C6',
      'C7',
      'C8',
      'C9',
      'C10',
      'C11',
      'C12',
      'C13',
      'C14',
      'C15',
      'C16',
      'C17',
      'C18',
      'C19',
      'C20',
      'C21',
      'C22',
      'C23',
      'C24',
      'C25',
      'C26',
      'C27',
      'C28',
      'C29',
      'C30'
    ]
  },
  state_commanded: 'ON'
};

const processingBlockList = ['pb-testrealtime-20240415-21626'];

const processingBlockDetail = {
  eb_id: 'eb-test-20240415-21626',
  script: {
    kind: 'realtime',
    name: 'vis-receive',
    version: '4.0.0'
  },
  channels_per_port: 2500,
  processors: [
    'mswriter',
    'signal-display-metrics-amplitude',
    'signal-display-metrics-basic',
    'signal-display-metrics-phase'
  ]
};

const processingBlockDetailState = {
  deployments: {
    'proc-pb-testrealtime-20240415-21626-vis-receive': 'RUNNING'
  },
  deployments_ready: true,
  last_updated: '2024-04-15 06:51:00',
  resources_available: true,
  status: 'READY'
};

const executionBlockList = ['eb-test-20240415-21626'];

const executionBlockDetail = {
  beams: [
    {
      beam_id: 'vis0',
      function: 'visibilities'
    }
  ],
  channels: [
    {
      channels_id: 'vis_channels',
      spectral_windows: [
        {
          count: 5000,
          freq_max: 368000000,
          freq_min: 350000000,
          link_map: [
            [0, 0],
            [200, 1],
            [744, 2],
            [944, 3]
          ],
          spectral_window_id: 'fsp_1_channels',
          start: 0,
          stride: 1
        }
      ]
    }
  ],
  context: {},
  current_scan_type: 'science',
  eb_id: 'eb-test-20240415-21626',
  fields: [
    {
      field_id: 'field_a',
      phase_dir: {
        dec: [-0.01328889],
        ra: [2.711325],
        reference_frame: 'ICRF3',
        reference_time: '...'
      },
      pointing_fqdn: 'low-tmc/telstate/0/pointing'
    },
    {
      field_id: 'field_b',
      phase_dir: {
        dec: [2.052388],
        ra: [12.48519],
        reference_frame: 'ICRF3',
        reference_time: '...'
      },
      pointing_fqdn: 'low-tmc/telstate/0/pointing'
    }
  ],
  max_length: 21600,
  pb_batch: [],
  pb_realtime: ['pb-testrealtime-20240415-21626'],
  pb_receive_addresses: 'pb-testrealtime-20240415-21626',
  polarisations: [
    {
      corr_type: ['XX', 'XY', 'YY', 'YX'],
      polarisations_id: 'all'
    }
  ],
  resources: {
    csp_links: [1, 2, 3, 4],
    receive_nodes: 1,
    receptors: [
      'C1',
      'C2',
      'C3',
      'C4',
      'C5',
      'C6',
      'C7',
      'C8',
      'C9',
      'C10',
      'C11',
      'C12',
      'C13',
      'C14',
      'C15',
      'C16',
      'C17',
      'C18',
      'C19',
      'C20',
      'C21',
      'C22',
      'C23',
      'C24',
      'C25',
      'C26',
      'C27',
      'C28',
      'C29',
      'C30'
    ]
  },
  scan_id: 1,
  scan_types: [
    {
      beams: {
        vis0: {
          channels_id: 'vis_channels',
          polarisations_id: 'all'
        }
      },
      scan_type_id: '.default'
    },
    {
      beams: {
        vis0: {
          field_id: 'field_a'
        }
      },
      derive_from: '.default',
      scan_type_id: 'science'
    },
    {
      beams: {
        vis0: {
          field_id: 'field_b'
        }
      },
      derive_from: '.default',
      scan_type_id: 'calibration'
    }
  ],
  scans: [],
  status: 'ACTIVE',
  subarray_id: '01'
};

const deploymentList = [
  'proc-pb-testrealtime-20240415-21626-script',
  'proc-pb-testrealtime-20240415-21626-vis-receive'
];

const deploymentDetail = {
  dpl_id: 'proc-pb-testrealtime-20240415-21626-vis-receive',
  kind: 'helm',
  args: {
    chart: 'vis-receive',
    values: {
      'data-product-storage': {
        name: 'shared-mnl'
      },
      env: [
        {
          name: 'SDP_PB_ID',
          value: 'pb-testrealtime-20240415-21626'
        },
        {
          name: 'SDP_KAFKA_HOST',
          value: 'ska-sdp-kafka.merlin:9092'
        },
        {
          name: 'SDP_CONFIG_HOST',
          value: 'ska-sdp-etcd-client.merlin'
        },
        {
          name: 'SDP_CONFIG_PORT',
          value: '2379'
        }
      ],
      podSettings: [
        {
          securityContext: {
            fsGroup: 0,
            runAsUser: 0
          }
        }
      ],
      processors: [
        {
          args: ['--readiness-file', '/tmp/processor_ready', 'output.ms'],
          image: 'artefact.skao.int/ska-sdp-realtime-receive-processors',
          name: 'mswriter-processor',
          readinessProbe: {
            file: '/tmp/processor_ready'
          },
          version: '2.0.0'
        },
        {
          command: [
            'plasma-processor',
            'ska_sdp_qa_metric_generator.plasma_to_metrics.SignalDisplayMetrics',
            '--plasma_socket',
            '/plasma/socket',
            '--readiness-file',
            '/tmp/processor_ready',
            '--use-sdp-metadata',
            false,
            '--metrics',
            'amplitude'
          ],
          image: 'artefact.skao.int/ska-sdp-qa-metric-generator',
          name: 'signal-display-metrics-amplitude',
          readinessProbe: {
            file: '/tmp/processor_ready'
          },
          version: '0.19.1'
        },
        {
          command: [
            'plasma-processor',
            'ska_sdp_qa_metric_generator.plasma_to_metrics.SignalDisplayMetrics',
            '--plasma_socket',
            '/plasma/socket',
            '--readiness-file',
            '/tmp/processor_ready',
            '--use-sdp-metadata',
            false,
            '--metrics',
            'stats,spectrum,spectrograms,lag_plot'
          ],
          image: 'artefact.skao.int/ska-sdp-qa-metric-generator',
          name: 'signal-display-metrics-basic',
          readinessProbe: {
            file: '/tmp/processor_ready'
          },
          version: '0.19.1'
        },
        {
          command: [
            'plasma-processor',
            'ska_sdp_qa_metric_generator.plasma_to_metrics.SignalDisplayMetrics',
            '--plasma_socket',
            '/plasma/socket',
            '--readiness-file',
            '/tmp/processor_ready',
            '--use-sdp-metadata',
            false,
            '--metrics',
            'phase'
          ],
          image: 'artefact.skao.int/ska-sdp-qa-metric-generator',
          name: 'signal-display-metrics-phase',
          readinessProbe: {
            file: '/tmp/processor_ready'
          },
          version: '0.19.1'
        }
      ],
      receiver: {
        instances: 1,
        options: {
          reception: {
            continuous_mode: true,
            reset_time_indexing_after_each_scan: true,
            stats_receiver_kafka_config: 'ska-sdp-kafka.merlin.svc:9092:json_workflow_state',
            transport_protocol: 'tcp'
          },
          scan_provider: {
            execution_block_id: 'eb-test-20240415-21626'
          },
          sdp_config_db: {
            host: 'ska-sdp-etcd-client.merlin',
            port: 2379
          },
          telescope_model: {
            execution_block_id: 'eb-test-20240415-21626',
            telmodel_key: 'instrument/ska1_low/layout/low-layout.json'
          },
          uvw: {
            disable_astropy_iers_autodownload: true
          }
        },
        port_start: 21000,
        streams: 2,
        version: '5.0.0'
      },
      script: 'vis-receive'
    }
  }
};

const deploymentDetailState = {
  num_pod: 1,
  pods: {
    'proc-pb-testrealtime-20240415-21626-vis-receive-00-0': 'RUNNING'
  }
};

export {
  subarrayList,
  subarrayDetail,
  processingBlockList,
  processingBlockDetail,
  processingBlockDetailState,
  executionBlockList,
  executionBlockDetail,
  deploymentList,
  deploymentDetail,
  deploymentDetailState
};
