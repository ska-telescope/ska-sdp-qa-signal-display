const subarrayList = ['01'];

const mockSubarrayDetail = {
  subarray: {
    eb_id: "eb-test-20240716-65504",
    last_command: null,
    last_command_time: null,
    obs_state_commanded: "IDLE",
    resources: {
      csp_links: [
        1,
        2,
        3,
        4
      ],
      receive_nodes: 1,
      receptors: [
        "C1",
        "C2",
        "C3",
        "C4",
        "C5",
        "C6",
        "C7",
        "C8",
        "C9",
        "C10",
        "C11",
        "C12",
        "C13",
        "C14",
        "C15",
        "C16",
        "C17",
        "C18",
        "C19",
        "C20",
        "C21",
        "C22",
        "C23",
        "C24",
        "C25",
        "C26",
        "C27",
        "C28",
        "C29",
        "C30"
      ]
    },
    state_commanded: "ON"
  },
  execution_block: {
    beams: [
      {
        beam_id: "vis0",
        function: "visibilities"
      }
    ],
    channels: [
      {
        channels_id: "vis_channels",
        spectral_windows: [
          {
            count: 5000,
            freq_max: 368000000,
            freq_min: 350000000,
            link_map: [
              [
                0,
                0
              ],
              [
                200,
                1
              ],
              [
                744,
                2
              ],
              [
                944,
                3
              ]
            ],
            spectral_window_id: "fsp_1_channels",
            start: 0,
            stride: 1
          }
        ]
      }
    ],
    context: {},
    current_scan_type: "science",
    eb_id: "eb-test-20240716-65504",
    fields: [
      {
        field_id: "field_a",
        phase_dir: {
          dec: [
            -0.01328889
          ],
          ra: [
            2.711325
          ],
          reference_frame: "ICRF3",
          reference_time: "..."
        },
        pointing_fqdn: "low-tmc/telstate/0/pointing"
      },
      {
        field_id: "field_b",
        phase_dir: {
          dec: [
            2.052388
          ],
          ra: [
            12.48519
          ],
          reference_frame: "ICRF3",
          reference_time: "..."
        },
        pointing_fqdn: "low-tmc/telstate/0/pointing"
      }
    ],
    max_length: 21600,
    pb_batch: [],
    pb_realtime: [
      "pb-testrealtime-20240716-65504"
    ],
    pb_receive_addresses: "pb-testrealtime-20240716-65504",
    polarisations: [
      {
        corr_type: [
          "XX",
          "XY",
          "YY",
          "YX"
        ],
        polarisations_id: "all"
      }
    ],
    resources: {
      csp_links: [
        1,
        2,
        3,
        4
      ],
      receive_nodes: 1,
      receptors: [
        "C1",
        "C2",
        "C3",
        "C4",
        "C5",
        "C6",
        "C7",
        "C8",
        "C9",
        "C10",
        "C11",
        "C12",
        "C13",
        "C14",
        "C15",
        "C16",
        "C17",
        "C18",
        "C19",
        "C20",
        "C21",
        "C22",
        "C23",
        "C24",
        "C25",
        "C26",
        "C27",
        "C28",
        "C29",
        "C30"
      ]
    },
    scan_id: null,
    scan_types: [
      {
        beams: {
          vis0: {
            channels_id: "vis_channels",
            polarisations_id: "all"
          }
        },
        scan_type_id: ".default"
      },
      {
        beams: {
          vis0: {
            field_id: "field_a"
          }
        },
        derive_from: ".default",
        scan_type_id: "science"
      },
      {
        beams: {
          vis0: {
            field_id: "field_b"
          }
        },
        derive_from: ".default",
        scan_type_id: "calibration"
      }
    ],
    scans: [],
    status: "ACTIVE",
    subarray_id: "01"
  },
  processing_block: {
    eb_id: "eb-test-20240716-65504",
    script: {
      kind: "realtime",
      name: "vis-receive",
      version: "4.0.0"
    },
    channels_per_port: 2500,
    processors: [
      "mswriter"
    ],
    signal_display_config: {
      metrics: "all"
    }
  },
  processing_block_state: {
    deployments: {
      "proc-pb-testrealtime-20240716-65504-vis-receive": "RUNNING"
    },
    deployments_ready: true,
    last_updated: "2024-07-16 07:08:32",
    resources_available: true,
    status: "READY"
  },
  deployments: {
    "proc-pb-testrealtime-20240716-65504-vis-receive": {
      state: "RUNNING",
      deployment: {
        key: "proc-pb-testrealtime-20240716-65504-vis-receive",
        kind: "helm",
        args: {
          chart: "vis-receive",
          values: {
            "data-product-storage": {
              name: "test-pvc"
            },
            env: [
              {
                name: "SDP_PB_ID",
                value: "pb-testrealtime-20240716-65504"
              },
              {
                name: "SDP_KAFKA_HOST",
                value: "ska-sdp-kafka.merlin:9092"
              },
              {
                name: "SDP_CONFIG_HOST",
                value: "ska-sdp-etcd-client.merlin"
              },
              {
                name: "SDP_CONFIG_PORT",
                value: "2379"
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
                args: [
                  "--readiness-file",
                  "/tmp/processor_ready",
                  "output.ms"
                ],
                image: "artefact.skao.int/ska-sdp-realtime-receive-processors",
                name: "mswriter-processor",
                readinessProbe: {
                  file: "/tmp/processor_ready"
                },
                version: "2.0.2"
              },
              {
                command: [
                  "plasma-processor",
                  "ska_sdp_qa_metric_generator.plasma_to_metrics.SignalDisplayMetrics",
                  "--plasma_socket",
                  "/plasma/socket",
                  "--readiness-file",
                  "/tmp/processor_ready",
                  "--use-sdp-metadata",
                  false,
                  "--metrics",
                  "stats,spectrum,spectograms,lag_plot"
                ],
                image: "artefact.skao.int/ska-sdp-qa-metric-generator",
                name: "signal-display-metrics-0",
                readinessProbe: {
                  file: "/tmp/processor_ready"
                },
                version: "0.20.0"
              },
              {
                command: [
                  "plasma-processor",
                  "ska_sdp_qa_metric_generator.plasma_to_metrics.SignalDisplayMetrics",
                  "--plasma_socket",
                  "/plasma/socket",
                  "--readiness-file",
                  "/tmp/processor_ready",
                  "--use-sdp-metadata",
                  false,
                  "--metrics",
                  "amplitude"
                ],
                image: "artefact.skao.int/ska-sdp-qa-metric-generator",
                name: "signal-display-metrics-1",
                readinessProbe: {
                  file: "/tmp/processor_ready"
                },
                version: "0.20.0"
              },
              {
                command: [
                  "plasma-processor",
                  "ska_sdp_qa_metric_generator.plasma_to_metrics.SignalDisplayMetrics",
                  "--plasma_socket",
                  "/plasma/socket",
                  "--readiness-file",
                  "/tmp/processor_ready",
                  "--use-sdp-metadata",
                  false,
                  "--metrics",
                  "phase"
                ],
                image: "artefact.skao.int/ska-sdp-qa-metric-generator",
                name: "signal-display-metrics-2",
                readinessProbe: {
                  file: "/tmp/processor_ready"
                },
                version: "0.20.0"
              }
            ],
            receiver: {
              instances: 1,
              options: {
                reception: {
                  continuous_mode: true,
                  reset_time_indexing_after_each_scan: true,
                  stats_receiver_kafka_config: "ska-sdp-kafka.merlin.svc:9092:json_workflow_state",
                  transport_protocol: "tcp"
                },
                scan_provider: {
                  execution_block_id: "eb-test-20240716-65504"
                },
                sdp_config_db: {
                  host: "ska-sdp-etcd-client.merlin",
                  port: 2379
                },
                telescope_model: {
                  execution_block_id: "eb-test-20240716-65504",
                  telmodel_key: "instrument/ska1_low/layout/low-layout.json"
                },
                uvw: {
                  disable_astropy_iers_autodownload: true
                }
              },
              port_start: 21000,
              streams: 2,
              version: "5.0.0"
            },
            script: "vis-receive"
          }
        },
        dpl_id: "proc-pb-testrealtime-20240716-65504-vis-receive"
      }
    }
  }
};

export {
  subarrayList,
  mockSubarrayDetail
};
