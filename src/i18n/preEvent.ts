export const PRE_EVENT_I18N = {
  en: {
    assetMonitoring: {
      title: 'Police Asset Anomaly Monitoring',
      normal: 'NORMAL',
      overdue: 'OVERDUE',
      abuse: 'ABUSE',
      suspectedClone: 'Suspected Clone/Private Use',
      bodyCamOverdue: 'Overdue',
      analysisDetail: 'Abuse Analysis Detail',
      dataComparison: 'Data Comparison',
      registryInfo: 'Registry Info',
      captured: 'Captured',
      result: 'Result',
      signalOverlap: 'Signal Overlap Analysis',
      overlapScore: 'Overlap Score',
      officerGps: 'Officer GPS vs Vehicle GPS',
      deviceGps: 'Device GPS: Dormitory',
      vehicleGps: 'Vehicle GPS: Highway',
      issueOrder: 'Issue Inspection Order',
      markFalsePositive: 'Mark as False Positive',
      registryToyota: "White Toyota A6",
      registryDistrict: "District: East City",
      registryStatus: "Status: In Storage",
      capturedZeekr: "Black Zeekr 001",
      capturedLocation: "Location: West City",
      capturedTime: "Time: 02:45 (Non-working)",
      assets: [
        { name: 'White Toyota (A88888)', applicant: 'Dep. Chief - A', details: 'Suspected Clone/Private Use' },
        { name: 'Body Cam - B2', applicant: 'Patrol - Zhang', details: 'Overdue' },
        { name: 'Patrol Car - C5', applicant: 'Traffic - Li' },
        { name: 'Mobile Terminal - M1', applicant: 'Inspector - Wang' },
      ]
    },
    highRiskMonitoring: {
      title: 'Social High-Risk Surveillance',
      threshold: 'Risk Threshold Trigger',
      highRisk: 'HIGH RISK',
      reasons: {
        speeding: 'Late Night Speeding/Complaints',
        gathering: 'Abnormal Gathering Warning',
        overlap: 'Abnormal Trajectory Overlap',
        access: 'Frequent Sensitive Area Access'
      },
      list: [
        { name: 'Black Zeekr (No Plate)', reason: 'Late Night Speeding/Complaints' },
        { name: 'Key Person - Zhang', reason: 'Abnormal Gathering Warning' },
        { name: 'Silver Mercedes (B12345)', reason: 'Abnormal Trajectory Overlap' },
        { name: 'Related Person - Li', reason: 'Frequent Sensitive Area Access' },
      ]
    },
    emergencyCmd: {
      incidentProfile: 'Incident Profile',
      active: 'ACTIVE',
      id: 'ID',
      status: 'Status',
      location: 'Loc',
      situationSummary: 'Live Situation Summary',
      fatalities: 'Fatalities',
      criticalInjured: 'Critical Injured',
      policeUnits: 'Police Units',
      medicalTeams: 'Medical Teams',
      intelligenceStream: 'Intelligence Stream',
      coordinationRoom: 'Coordination Room',
      liveStream: 'LIVE STREAM',
      aiDecisionSupport: 'AI Decision Support',
      trigger: 'Trigger',
      accept: 'Accept',
      reject: 'Reject',
      liveIncident: 'Live Incident',
      incidentStates: [
        "03:29 First dispatch. High-speed collision on Al-Farabi Avenue. 1 fatality initially found. Emergency units rushing to the core area.",
        "Rescue operations in full swing. Extraction reveals more trapped individuals. Confirmed fatalities risen to 4. Surrounding roads physically isolated.",
        "Medical assessment complete. 1 injured with extremely unstable vitals sent to trauma center. Final count: 3 fatalities, 1 critical injury. Evidence collection ongoing."
      ],
      conferenceSeeds: [
        { role: 'Command Desk', message: 'Confirming accident core location, initiating <red>Major Traffic Accident Response</red>. First, lock down casualty count, passable lanes, and secondary collision risks.' },
        { role: 'UAV Recon', message: 'On site. Overhead footage shows severe frontal overlap, center area completely blocked. <red>Impact Core</red> initially judged to be in the middle of the main road.' },
        { role: 'EMS Dispatch', message: 'We see at least <red>3 unresponsive persons</red> in the Mercedes. Another injured person on the road likely from the other vehicle, status <red>Critical</red>.' },
        { role: 'Traffic Control', message: 'Eastbound traffic slowed, but vehicles still approaching from the west. Recommend immediate <red>Two-way Lockdown</red> and clearing emergency lanes.' },
        { role: 'Fire Rescue', message: 'Copy. Passenger side and front cabin severely crushed, hydraulic spreaders entering. No fire visible, but risk of electrical and fuel leaks.' },
        { role: 'Hospital Link', message: 'Trauma center reserved 1 ER slot and 1 ICU bed. Confirm if <red>Critical Injury</red> is stable for transport ASAP.' },
        { role: 'Command Desk', message: 'Copy all units. Traffic police expand perimeter to 500m. EMS prioritize the <red>Critical Patient</red>. UAV maintain high-altitude tracking of the suspect vehicle escape route.' },
        { role: 'Field Unit', message: 'Suspect vehicle identified as a <red>Zeekr 001 FR</red>, license plate KZ 102 POL. Tracing LBS signals and checkpoint history now.' },
        { role: 'Intelligence', message: 'LBS hit. Suspect phone active near <red>Sairan Lake</red>. Signal is moving fast. Coordinating with local precinct for interception.' },
        { role: 'Command Desk', message: 'Understood. All units near Sairan Lake, prepare for <red>High-Speed Intercept</red>. Do not engage without backup.' },
        { role: 'Medical Supervisor', message: 'Critical patient stabilized for transport. ETA to trauma center: 8 minutes. Requesting <red>Green Wave</red> on Abay Ave.' },
      ],
      recommendations: [
        { title: 'Initiate Trauma Center Priority Link', reason: 'Latest report shows <red>1 Critical Injury</red>', action: 'Immediately contact city trauma center dispatch, open green emergency channel and reserve ICU bed.' },
        { title: 'Expand Core Lockdown Perimeter', reason: 'Traffic police and UAV report <red>Increasing Onlookers</red>', action: 'Expand perimeter from 100m to 300m and set up second-tier traffic diversion points.' },
        { title: 'Secure Scene Video Evidence', reason: 'Conference stream mentions <red>High-speed Racing</red>', action: 'Immediately package and retrieve 15-min video cache from checkpoints, intersections, and preceding road segments.' },
        { title: 'Initiate Prosecution / Forensic Notification', reason: 'Key info: <red>3 Fatalities</red> reported', action: 'Notify forensic duty team and prosecution liaison to standby; synchronize death confirmation and evidence chain preservation.' },
        { title: 'Answer Incoming High-Priority Call', reason: 'Incoming call from <red>City Mayor Office</red>', action: 'Establish secure voice link and provide preliminary incident briefing.' },
      ]
    },
    keyIntelligence: {
      title: 'Key Intelligence Analysis',
      searchPlaceholder: 'Search intelligence, coordinates, entities...',
      accidentCoords: 'Accident Coordinates',
      replayTitle: 'Spatio-Temporal Collision Replay (REPLAY)',
      eventWindow: 'Event Window',
      racingVehicles: 'Racing Vehicles',
      opposingVehicles: 'Opposing Vehicles',
      currentStatus: 'Current Status',
      statusIdle: 'Waiting for Replay',
      statusApproach: 'High-speed Trajectory Approach',
      statusConflict: 'Trajectory Intersection Risk Rising',
      statusImpact: 'Collision Occurred',
      statusSecured: 'Accident Area Under Lockdown',
      tags: {
        racing: 'Street Racing Suspected',
        majorCrash: 'Major Crash',
        reconstruction: '3-Vehicle Reconstruction',
      },
      autoReplay: 'Auto Replay',
      phases: {
        racing: 'Racing Detected',
        conflict: 'Conflict',
        impact: 'Impact',
        secured: 'Secured',
      },
      collisionDetails: {
        title: 'Collision Event Details',
        time: 'Time',
        type: 'Type',
        energy: 'Energy Index',
        casualty: 'Casualty Estimate',
        typeValue: 'High-speed Head-on Collision',
        casualtyValue: 'Extremely High',
      },
      majorIncidentArea: 'MAJOR INCIDENT AREA',
      live: 'LIVE',
      collision: 'COLLISION',
      speed: 'km/h',
      replaying: 'REPLAYING',
      surveyRecon: 'Scene Survey Reconstruction',
      physicalMap: 'Physical Generation Map',
      digitalMap: 'Digital Generation Map',
      nebulaMap: 'Device Nebula Point Cloud Map',
      imageGenerating: 'Image Generating...',
      noData: 'No Data',
      digitalAnalysis: 'Digital Generation Map - Deep Analysis',
      digitalExtraction: 'Digital Feature Extraction',
      closeDetails: 'Close Details',
      digitalFeatures: [
        "1. Severed Finger (Biometric)",
        "2. Smashed Phone (Communication Terminal)",
        "3. Scattered Parts (Mechanical Debris)",
        "4. Brake Marks (Physical Vector)",
        "5. Glass Shards (Refractive Feature)",
        "6. Driver Biometrics (DNA)",
        "7. Collision Angle Data (Geometric)",
        "8. Speed Vector Lines (Dynamics)",
        "9. Airbag Residue (Chemical)",
        "10. Fuel Leak Range (Environmental)",
        "11. Tire Wear Characteristics (Trace)",
        "12. Road Marking Offset (Spatial)",
        "13. Blind Spot Completion (Visual)",
        "14. Ambient Light Simulation (Optical)",
        "15. Sound Spectrum Analysis (Acoustic)",
        "16. Vehicle Chassis Damage (Structural)",
        "17. Battery Pack Thermal Runaway Risk (Thermal)",
        "18. Passenger Posture Reconstruction (Posture)",
        "19. Instantaneous Acceleration (Mechanical)",
        "20. Avoidance Path Deviation (Decision)"
      ],
      recon: {
        rendering: 'Video Rendering...',
        waiting: 'Waiting for Command',
        engineActive: 'RENDERING_ENGINE_ACTIVE',
        engineStandby: 'ENGINE_STANDBY',
        btnRecon: 'Scene Accident Reconstruction',
      },
      scenarios: {
        recon: {
          title: 'Accident Reconstruction',
          desc: '1:1 reconstruction of the accident moment based on multi-source video fusion and physical engine simulation. Precisely calculate collision angles, force distribution, and avoidance trajectories through LiDAR point cloud and surveillance video fitting.',
        },
        spatio: {
          title: 'Spatio-Temporal Analysis',
          desc: 'Obtain data insights through spatio-temporal cross-calculation of geographic location and event data. The system automatically traces back all trajectory anomalies 15 minutes before the accident, identifying potential collision risks of two vehicles driving towards each other.',
        },
        corr: {
          title: 'Relationship Analysis',
          desc: 'Penetrate five major ontologies: people, places, events, things, and organizations to automatically build 80+ entity relationship graphs. Identify the perpetrator\'s social circle, financial transactions, and historical violations to uncover deep social networks.',
        },
        cross: {
          title: 'Cross-Calculation',
          desc: 'Multi-dimensional data collision engine. Perform multi-point cross-verification of LBS signals, checkpoint data, and mobile payment records to ensure the uniqueness and accuracy of intelligence analysis, eliminating false target interference.',
        }
      },
      reconSteps: [
        "Collected 6 accident-related posts, 16 web pages, and 25 videos.",
        "Established timeline, detailing the process: 'Driving - Out of Control - Collision - Lockdown'.",
        "Extracted core info: time, location, people, vehicles, environment.",
        "Reconstructed the spatial structure of the Al-Farabi Avenue accident section.",
        "Organized the driving directions and relative positions of the two vehicles involved.",
        "Built visual asset library: roads, vehicles, buildings, surveillance, crowds.",
        "Drew 1st keyframe: Normal driving before the accident.",
        "Added details: traffic flow, streetlights, surveillance poles, buildings, road markings.",
        "Drew 2nd keyframe: Static scene after impact.",
        "Added debris, brake marks, emergency-stopped vehicles, and onlookers.",
        "Drew 3rd keyframe: Police arrival and road lockdown.",
        "Expanded: police cars, ambulances, onlookers, and traffic congestion.",
        "Generated 0–5s vehicle driving video segment.",
        "Generated 5–10s vehicle out-of-control impact video segment.",
        "Generated 10–20s police arrival and lockdown video segment.",
        "Added camera zoom-in, zoom-out, tilt, and transition controls.",
        "Configured audio: traffic, impact, sirens, and scene commotion.",
        "Added subtitles: time, location, and phase descriptions.",
        "Unified black-and-white line art style and overall rhythm.",
        "Output 20s event reconstruction video and 3 keyframe images."
      ],
      surveySteps: [
        "Scene Image Element Collection",
        "Scene Element Organization",
        "Spatial Feature Matching",
        "Physical Collision Parameter Calculation",
        "Scene Panorama Drawing"
      ]
    },
    executiveDrafting: {
      title: 'Executive Drafting',
      subtitle: 'AI STATECRAFT',
      interfaceVersion: 'Document Generation Interface v2.0',
      engineReady: 'AI Engine Ready',
      selectTemplate: 'Select Template',
      contextualInputs: 'Contextual Inputs',
      targetAudience: 'Target Audience',
      securityClassification: 'Security Classification',
      intelligenceSources: 'Intelligence Sources',
      startGeneration: 'Start Generation',
      drafting: 'Drafting...',
      workspace: 'Drafting Workspace',
      waiting: 'Waiting for generation...',
      aiDrafting: 'AI is drafting...',
      executionFlow: 'Execution Flow',
      auditLog: 'Audit Log',
      print: 'Print',
      export: 'Export',
      submitApproval: 'Submit Approval',
      engineNominal: 'DRAFT ENGINE: NOMINAL',
      sopValidation: 'SOP VALIDATION: ACTIVE',
      region: 'REGION: ASIA-SOUTH-1',
      build: 'BUILD: 2026.04.09_REL-DRAFTING',
      copyright: '© 2026 AEGIS DEFENSE SYSTEMS',
      expandedWorkspace: 'Expanded Drafting Workspace',
      ministry: 'Ministry of Interior',
      bureau: 'STATE SECURITY BUREAU',
      confidential: 'Confidential',
      ref: 'REF',
      refinePlaceholder: 'Refine draft (e.g., \'Make it more formal\')...',
      refineExpandedPlaceholder: 'Refine draft in expanded view...',
      applyRefinement: 'Apply Refinement',
      audiences: ['PUBLIC RELEASE', 'MINISTERIAL LEVEL', 'PRESIDENTIAL BRIEF', 'INTERNAL ONLY'],
      securityLevels: ['TOP SECRET', 'SECRET', 'INTERNAL'],
      sources: ['Social Media', 'Web Intel', 'Police Records', 'Video Materials'],
      draftTypes: {
        official_document: {
          title: 'Official Document',
          desc: 'Generate official documents, requests, notices, reports, and circulation files',
        },
        press_release: {
          title: 'Press Release',
          desc: 'Generate press releases for public opinion events, authoritative bulletins, and public statements',
        },
        leadership_brief: {
          title: 'Leadership Brief',
          desc: 'Generate high-level summary materials for ministers, the president, or special task forces',
        },
        public_opinion_report: {
          title: 'Public Opinion Report',
          desc: 'Generate special reports on public opinion dissemination, focus points, risks, and response suggestions',
        },
        sop_disposal_draft: {
          title: 'SOP Disposal Draft',
          desc: 'Generate response suggestions and action drafts based on police SOPs',
        },
        circulation_package: {
          title: 'Circulation Package',
          desc: 'Generate materials for countersigning, approval, distribution, printing, and archiving',
        }
      },
      steps: {
        press_release: [
          { title: 'Receive Press Release Request', desc: 'Identified draft type as "Public Opinion Event Press Release"' },
          { title: 'Load Press Release Templates & Rules', desc: 'Matched media release templates and police SOP public expression rules' },
          { title: 'Read Social Media, Web, Video & Police Sources', desc: 'Summarizing multi-source intelligence inputs and performing validity screening' },
          { title: 'Extract Core Event Elements', desc: 'Extracted time, location, personnel, vehicles, disposal actions, and status info' },
          { title: 'Draft Press Release via Police SOP Structure', desc: 'Constructing title, lead, event details, disposal progress, and official conclusions' },
          { title: 'Optimize Wording & Clean Sensitive Content', desc: 'Performing wording correction, consistency checks, and sensitive info removal' },
          { title: 'Generate Final Press Release', desc: 'Generated publishable version and synced to preview, print, save, and distribution areas' }
        ],
        official_document: [
          { title: 'Receive Official Document Task', desc: 'Identified draft type: Reporting Material' },
          { title: 'Identify Document Category', desc: 'Matched request/report/supervision/notice specifications' },
          { title: 'Read Matter Background & Event Materials', desc: 'Extracted matter background and previous situation summary' },
          { title: 'Extract Reporting Items & Handling Advice', desc: 'Generated primary recipient and document title' },
          { title: 'Generate Body via Official Format', desc: 'Arranging body structure and handling suggestions' },
          { title: 'Correct Style & Wording Standards', desc: 'Completed official style correction' },
          { title: 'Generate Final Official Draft', desc: 'Initial official draft generated' }
        ],
        leadership_brief: [
          { title: 'Receive Leadership Briefing Task', desc: 'Identified briefing target: Presidential Brief' },
          { title: 'Compress Intelligence into Executive Summary', desc: 'Compressing multi-source intelligence into executive-readable summary' },
          { title: 'Identify Key Points for Leadership', desc: 'Extracted 4 key points requiring leadership attention' },
          { title: 'Generate "Situation-Judgment-Advice" Structure', desc: 'Generating "Situation-Judgment-Advice" structure' },
          { title: 'Form Initial Briefing Draft', desc: 'Initial briefing draft formed' },
          { title: 'Output Presidential Review Briefing', desc: 'Presidential review version briefing output' }
        ]
      },
      content: {
        press_release: [
          { title: 'Title', content: 'Authoritative Bulletin on the Progress of the 3.21 Almaty Major Traffic Accident Response' },
          { title: 'Lead', content: 'In the early hours of March 21, 2026, a multi-vehicle collision occurred on Al-Farabi Avenue in Almaty. Currently, on-site disposal has basically concluded, and related investigation work is being carried out in an orderly manner.' },
          { title: 'Event Overview', content: 'The accident occurred at 2:15 AM, involving 3 private cars and 1 light truck. Preliminary judgment indicates a chain collision caused by speeding.' },
          { title: 'Police Response Progress', content: 'Police immediately cordoned off the scene, and medical departments treated 4 injured persons. Road traffic has now returned to normal, and involved vehicles have been towed away.' },
          { title: 'Current Authoritative Conclusion', content: 'After preliminary testing, the main person responsible is suspected of drunk driving, and relevant biological samples have been sent for testing.' },
          { title: 'Closing Remarks', content: 'Citizens are requested not to believe or spread rumors and to follow official follow-up bulletins.' }
        ],
        leadership_brief: [
          { title: 'Situation Summary', content: 'The 3.21 accident caused 4 injuries; social attention is extremely high, and public opinion escalation must be prevented.' },
          { title: 'Core Judgment', content: 'Primary responsibility for the accident is clear, but foreign nationals are involved, requiring attention to foreign affairs coordination.' },
          { title: 'Current Response Status', content: 'The scene has been cleared, and the injured are in stable condition.' },
          { title: 'Items Requiring Leadership Attention', content: '1. Dissemination of false videos on social media; 2. Emotional comfort for the families of the injured.' },
          { title: 'Next Steps Advice', content: 'It is recommended that the Municipal Bureau issue a unified authoritative bulletin and activate the Level 2 public opinion response plan.' }
        ],
        public_opinion_report: [
          { title: 'Title', content: 'Special Report on Public Opinion Dissemination of the 3.21 Almaty Traffic Accident' },
          { title: 'Dissemination Overview', content: 'The event has reached 2M+ impressions across Telegram and Instagram within 4 hours. Sentiment is 65% negative, focusing on illegal racing rumors.' },
          { title: 'Key Focus Points', content: '1. Identity of the Zeekr driver; 2. Alleged police involvement in racing; 3. Speed of emergency response.' },
          { title: 'Risk Assessment', content: 'High risk of offline protests if official clarification is delayed beyond 12 hours.' },
          { title: 'Response Suggestions', content: 'Release bodycam footage immediately to debunk racing rumors and highlight rescue efforts.' }
        ],
        official_document: [
          { title: 'Title', content: 'Notice on Strengthening Traffic Safety Management During Nighttime Hours' },
          { title: 'Background', content: 'Following the major accident on Al-Farabi Avenue, it is necessary to reinforce nighttime patrols and checkpoint operations.' },
          { title: 'Directives', content: '1. Increase patrol frequency by 50%; 2. Deploy mobile radar units at 10 key intersections; 3. Conduct strict sobriety checks.' },
          { title: 'Implementation', content: 'All district bureaus must submit their deployment plans by 6:00 PM today.' }
        ],
        sop_disposal_draft: [
          { title: 'Title', content: 'SOP Disposal Draft for High-Speed Collision Events' },
          { title: 'Initial Actions', content: 'Cordon off 500m radius, activate emergency lane, notify nearest Level 1 trauma center.' },
          { title: 'Evidence Preservation', content: 'Secure all VMS data, perform 3D laser scanning of impact core, impound all involved electronic devices.' },
          { title: 'Communication Protocol', content: 'Establish secure link with Command Center, provide updates every 15 minutes.' }
        ],
        circulation_package: [
          { title: 'Title', content: 'Circulation Package: 3.21 Incident Preliminary Investigation Report' },
          { title: 'Distribution List', content: 'Minister of Interior, Almaty Police Chief, City Prosecutor Office.' },
          { title: 'Approval Status', content: 'Pending countersignature from Legal Department.' }
        ]
      }
    },
    officialVehicles: {
      title: 'Official Vehicle Exception Trace',
      subtitle: 'Anomaly monitoring, review, and closure workflow',
      activeCase: 'Active Case',
      legacyPage: 'Legacy Page',
      compareMode: 'Compare Mode',
      kpis: {
        activeExceptions: 'Active Exceptions',
        highSeverity: 'High Severity',
        inReview: 'In Review',
        awaitingDispatch: 'Awaiting Dispatch',
        longestDelay: 'Longest Delay',
        unarchivedCases: 'Unarchived Cases',
      },
      lifecycle: {
        title: 'Anomaly Lifecycle Trace',
        completed: 'Completed',
        pending: 'Pending',
        delayed: 'Delayed',
      },
      analytics: {
        title: 'Trace Analytics',
        longestDelay: 'Longest Delay',
        reviewRework: 'Review Rework',
        blockers: 'Blockers',
        closureRate: 'Closure Rate',
        bottleneck: 'Critical Bottleneck',
        bottleneckDesc: 'Maintenance verification at North District Auto is currently blocked by missing entry logs.',
      },
      workspaces: {
        title: 'Related Workspaces',
        originalDetail: 'Original Detail',
        maintenanceQueue: 'Maintenance Queue',
        mapMonitor: 'Map Monitor',
        graphWorkspace: 'Graph Workspace',
        videoPanel: 'Video Panel',
        archiveRecord: 'Archive Record',
      },
      ui: {
        hideAnalytics: 'Hide Trace Analytics',
        showAnalytics: 'Show Trace Analytics',
        evidenceSync: 'Evidence Sync: Active',
        reviewFullCase: 'Review Full Case',
      },
      mockData: {
        cases: {
          case1: {
            desc: 'Maintenance budget exceeds 150%; No entry records at North District Auto.',
            action: 'Immediate physical inspection and driver interview required.'
          },
          case2: {
            desc: 'Routine maintenance completed ahead of schedule.',
            action: 'None. Archive complete.'
          },
          case3: {
            desc: 'Abnormal hardware wear detected via OBD.',
            action: 'Schedule technical audit.'
          }
        },
        nodes: {
          detected: 'Detected',
          verified: 'Verified',
          assigned: 'Assigned',
          maintenance: 'Maintenance',
          reviewed: 'Reviewed',
          archived: 'Archived'
        },
        stats: {
          mission: 'On Mission',
          idle: 'Idle',
          maintenance: 'Maintenance',
          scrapped: 'Scrapped'
        },
        ledger: {
          title: 'Maintenance Queue',
          activeTitle: 'Active Mission Fleet',
          anomalyDetected: 'Ledger Anomaly Detected',
          anomalyDesc: 'Ledger Warning: Maintenance budget exceeds 150%; The registered repair shop (North District Auto) reports no entry records for this vehicle in the past two months.'
        }
      }
    },
    policePersonnel: {
      ledger: {
        title: 'Personnel Ledger',
        active: 'Active Duty',
        onLeave: 'On Leave',
        suspended: 'Suspended',
        search: 'Search personnel...',
        standby: 'On Standby',
        inTraining: 'In Training',
        forceStatus: 'Almaty Force Status',
        statsByType: 'Stats by Police Type',
        statsByDistrict: 'Stats by District Bureau',
        unit: 'Unit',
        keyAnomalies: 'Unit 102 Key Anomalies',
        unitFocus: 'UNIT 102 FOCUS',
        critical: 'CRITICAL',
        normal: 'NORMAL',
        stats: {
          total: 'Total Personnel',
          active: 'Active',
          special: 'Special Ops',
          risk: 'High Risk'
        },
        types: {
          publicSecurity: 'Public Security',
          trafficPolice: 'Traffic Police',
          criminalInvestigation: 'Criminal Investigation',
          swat: 'SWAT',
          cyberSecurity: 'Cyber Security',
          narcotics: 'Narcotics',
          internalAdmin: 'Internal Admin',
          municipalDirect: 'Municipal Direct',
          trafficBureau: 'Traffic Bureau',
          cid: 'CID',
          specialOps: 'Special Ops',
          cyberBureau: 'Cyber Bureau',
          narcoticsBureau: 'Narcotics Bureau',
          generalOffice: 'General Office'
        },
        districts: {
          district102: '102 District Bureau',
          bostandyk: 'Bostandyk District Bureau',
          zhetysu: 'Zhetysu District Bureau',
          medeu: 'Medeu District Bureau',
          turksib: 'Turksib District Bureau',
          alatau: 'Alatau District Bureau',
          airport: 'Airport Bureau',
          nauryzbay: 'Nauryzbay District Bureau'
        },
        tags: {
          assetAnomaly: 'Asset Anomaly',
          abuseOfPower: 'Abuse of Power',
          gangSuspect: 'Gang Suspect',
          frequentComplaints: 'Frequent Complaints',
          disciplinedSlack: 'Disciplined Slack',
          poorPerformance: 'Poor Performance',
          unstableEmotion: 'Unstable Emotion',
          illegalExit: 'Illegal Exit'
        }
      },
      hologram: {
        profile: 'Personnel Profile',
        rank: 'Rank',
        id: 'Badge ID',
        unit: 'Unit',
        specialization: 'Specialization',
        clearance: 'Clearance Level',
        biometrics: 'Biometric Status',
        heartRate: 'Heart Rate',
        stress: 'Stress Level',
        location: 'Current Location',
        selectPersonnel: 'Select Personnel to Load Hologram',
        records: 'Records',
        operations: 'Operations',
        aiInference: 'AI Anomaly Inference',
        analyzing: 'ANALYZING...',
        stats: {
          internalBadgeId: 'Internal Badge ID',
          passportStatus: 'Passport Status',
          submittedToIA: 'Submitted to Internal Affairs',
          issuedWeapon: 'Issued Weapon',
          bodycamMac: 'Bodycam MAC',
          officeTerminalIp: 'Office Terminal IP',
          mobileTerminalIp: 'Mobile Terminal IP',
          tabletTerminalIp: 'Tablet Terminal IP',
          bloodTypeDna: 'Blood Type / DNA',
          storedInDatabase: 'Stored in Database',
          politicalStatus: 'Political Status',
          rulingPartyMember: 'Ruling Party Member',
          maritalStatus: 'Marital Status',
          divorced: 'Divorced',
          financialStatus: 'Financial Status',
          recentLargeCredit: 'Recent Large Credit',
          psychologicalMedical: 'Psychological / Medical',
          insomniaAnxiety: 'Insomnia & Anxiety / High Heart Rate',
          primaryVehicle: 'Primary Vehicle',
          residentialAddress: 'Residential Address',
          emergencyContact: 'Emergency Contact',
          bankCards: 'Bank Cards',
          cardsAnomaly: 'Cards (1 Anomaly)',
          frequentBaseStations: 'Frequent Base Stations',
          frequentRf: 'Frequent RF'
        },
        anomalies: {
          spatioTemporal: 'Spatio-Temporal Anomaly',
          spatioTemporalDesc: 'Frequently appears illegally in non-jurisdictional areas (high-end clubs on Al-Farabi Ave) late at night (02:00-04:00).',
          physiological: 'Physiological Anomaly',
          physiologicalDesc: 'Smart band data indicates significant health issues recently, with extremely high heart rates during missions, suggesting undeclared drug dependency.',
          commFinancial: 'Communication & Financial Anomaly',
          commFinancialDesc: 'Frequently uses evasive means to contact overseas numbers, and multiple overseas transfers from unknown shell companies have appeared under the names of immediate family members.'
        }
      },
      intelligence: {
        title: 'Personnel Intelligence Network',
        nodes: 'Nodes',
        edges: 'Edges',
        engine: 'Engine',
        secureEnclave: 'Secure Enclave',
        liveSync: 'Live Sync',
        systemActive: 'System Active',
        entities: 'Entities',
        standard: 'Standard',
        highRisk: 'High Risk',
        medRisk: 'Med Risk',
        confidence: 'Confidence',
        confirmed: 'Confirmed',
        inferred: 'Inferred',
        alleged: 'Alleged',
        signalLost: 'SIGNAL LOST',
        activeBaseStation: 'ACTIVE BASE STATION',
        signalTraffic: 'SIGNAL TRAFFIC FLOW',
        spoofingWarning: 'Device Signal Spoofing Warning: Police terminal GPS manually blocked for 45 minutes, during which the carrier\'s private device moved to the core area of the 3.21 accident.',
        ontologyExpanded: 'Entity Relationship Ontology (EXPANDED)',
      }
    },
    ontology: {
      title: 'Entity Relationship Ontology (Expanded)',
      nodes: 'Nodes',
      edges: 'Edges',
      engine: 'Engine',
      secureEnclave: 'Secure Enclave',
      liveSync: 'Live Sync',
      systemActive: 'System Active',
      entities: 'Entities',
      standard: 'Standard',
      highRisk: 'High Risk',
      medRisk: 'Med Risk',
      confidence: 'Confidence',
      confirmed: 'Confirmed',
      inferred: 'Inferred',
      alleged: 'Alleged',
      clusters: {
        infrastructure: 'Vehicle & Infrastructure',
        unknown: 'Unknown Network',
        media: 'Media & Oversight'
      }
    },
    exploration: {
      title: 'Intelligent Exploration',
      subtitle: 'AI STATECRAFT FOR MINISTER',
      postIncident: 'POST-INCIDENT ANALYSIS',
      search: 'SEARCH DATABASES / TABLES / ENTITIES',
      kpis: {
        connected: 'Connected DBs',
        tables: 'Logical Tables',
        governed: 'Governed',
        activeTasks: 'Active Tasks',
        mappings: 'Entity Mappings'
      },
      latency: 'LATENCY',
      secureEnclave: 'SECURE ENCLAVE',
      operator: 'OPERATOR',
      progress: {
        title: 'Data Governance & Semantic Understanding Progress',
        subtitle: 'Queried {total} tables, completed {completed} / {total}'
      },
      flow: {
        title: 'Exploration Flow',
        steps: ['Ingest', 'Govern', 'Understand', 'Compute', 'Assemble']
      },
      engine: {
        title: 'Semantic Engine'
      },
      agent: {
        title: 'Exploration Agent',
        subtitle: 'Semantic Context Engine',
        btnStart: 'Start Intelligent Exploration',
        ready: 'READY',
        desc: 'Automatically understand multi-source heterogeneous data, building a case-level Q&A semantic context.',
        contextGenerated: 'Case semantic context generated. You can ask questions about people, vehicles, communications, trajectories, payments, etc.',
        placeholder: 'Ask about data context...',
        assistantResponse: 'Performing deep analysis based on current case context...'
      },
      insightSuggestions: [
        {
          title: 'Compare cross-DB activity trajectories of involved vehicles within key time windows',
          desc: 'Query trajectories, checkpoints, LBS, and payment data to identify companions, tailing, meetings, or abnormal detours.'
        },
        {
          title: 'Extract abnormal communications and high-frequency relationship objects before and after the incident',
          desc: 'Filter high-correlation contacts and potential co-participants based on phone numbers, IM, communications, shared locations, and social relationships.'
        },
        {
          title: 'Automatically restore the 4D case chain of "Person-Vehicle-Place-Time"',
          desc: 'Generate case spatio-temporal graph, identifying key stay points, time windows, and device nodes.'
        }
      ]
    }
  },
  zh: {
    assetMonitoring: {
      title: '警用资产异常监测',
      normal: '正常',
      overdue: '逾期',
      abuse: '违规使用',
      suspectedClone: '疑似套牌/私用',
      bodyCamOverdue: '逾期未还',
      analysisDetail: '违规使用分析详情',
      dataComparison: '数据比对',
      registryInfo: '登记信息',
      captured: '抓拍信息',
      result: '分析结果',
      signalOverlap: '信号重叠分析',
      overlapScore: '重叠评分',
      officerGps: '警员 GPS vs 车辆 GPS',
      deviceGps: '设备 GPS: 宿舍',
      vehicleGps: '车辆 GPS: 高速公路',
      issueOrder: '下达核查指令',
      markFalsePositive: '标记为误报',
      registryToyota: "白色丰田 A6",
      registryDistrict: "区域: 东城区",
      registryStatus: "状态: 在库",
      capturedZeekr: "黑色极氪 001",
      capturedLocation: "地点: 西城区",
      capturedTime: "时间: 02:45 (非工作时间)",
      assets: [
        { name: '白色丰田 (A88888)', applicant: '副局长 - A', details: '疑似套牌/私用' },
        { name: '执法仪 - B2', applicant: '巡警 - 张', details: '逾期未还' },
        { name: '巡逻车 - C5', applicant: '交警 - 李' },
        { name: '移动终端 - M1', applicant: '督察 - 王' },
      ]
    },
    highRiskMonitoring: {
      title: '社会高风险人员监测',
      threshold: '风险阈值触发',
      highRisk: '高风险',
      reasons: {
        speeding: '深夜超速/投诉',
        gathering: '异常聚集预警',
        overlap: '异常轨迹重叠',
        access: '频繁出入敏感区域'
      },
      list: [
        { name: '黑色极氪 (无牌)', reason: '深夜超速/投诉' },
        { name: '重点人员 - 张某', reason: '异常聚集预警' },
        { name: '银色奔驰 (B12345)', reason: '异常轨迹重叠' },
        { name: '关联人员 - 李某', reason: '频繁出入敏感区域' },
      ]
    },
    emergencyCmd: {
      incidentProfile: '事件概况',
      active: '活跃',
      id: '编号',
      status: '状态',
      location: '地点',
      situationSummary: '实时态势摘要',
      fatalities: '死亡人数',
      criticalInjured: '重伤人数',
      policeUnits: '警力单位',
      medicalTeams: '医疗团队',
      intelligenceStream: '情报流',
      coordinationRoom: '协调室',
      liveStream: '实时直播',
      aiDecisionSupport: 'AI 决策支持',
      trigger: '触发原因',
      accept: '接受',
      reject: '拒绝',
      liveIncident: '实时事件',
      incidentStates: [
        "03:29 首次派警。阿尔法拉比大道发生高速碰撞。初步发现 1 人死亡。应急单位正赶往核心区域。",
        "救援行动全面展开。破拆发现更多被困人员。确认死亡人数升至 4 人。周边道路已物理隔离。",
        "医疗评估完成。1 名生命体征极不稳定的伤者送往创伤中心。最终计数：3 人死亡，1 人重伤。现场取证正在进行中。"
      ],
      conferenceSeeds: [
        { role: '指挥台', message: '确认事故核心位置，启动 <red>重大交通事故响应</red>。首先，锁定伤亡人数、可通行车道和二次碰撞风险。' },
        { role: '无人机侦察', message: '已到达现场。航拍画面显示严重的正面重叠，中心区域完全阻塞。<red>影响核心</red>初步判断位于主干道中部。' },
        { role: '急救调度', message: '我们在奔驰车内看到至少 <red>3 名无反应人员</red>。路上的另一名伤者可能来自另一辆车，状态 <red>危急</red>。' },
        { role: '交通管制', message: '东行交通缓慢，但仍有车辆从西面驶来。建议立即进行 <red>双向封锁</red> 并清理应急车道。' },
        { role: '消防救援', message: '收到。乘客侧和前舱严重受损，液压扩张器正在进入。未见火情，但存在电路和燃料泄漏风险。' },
        { role: '医院联动', message: '创伤中心预留了 1 个急诊位和 1 个 ICU 床位。请尽快确认 <red>重伤员</red> 是否稳定以便转运。' },
        { role: '指挥台', message: '收到，所有单位。交警扩大警戒范围至 500 米。急救优先处理 <red>危重病人</red>。无人机保持对嫌疑车辆逃逸路线的高空追踪。' },
        { role: '外勤单位', message: '嫌疑车辆确认为 <red>极氪 001 FR</red>，车牌号 KZ 102 POL。正在追踪 LBS 信号和卡口历史记录。' },
        { role: '情报部门', message: 'LBS 命中。嫌疑人手机在 <red>赛兰湖</red> 附近活跃。信号移动速度很快。正在协调当地派出所进行拦截。' },
        { role: '指挥台', message: '明白。赛兰湖附近的所有单位，准备进行 <red>高速拦截</red>。在没有支援的情况下不要贸然行动。' },
        { role: '医疗主管', message: '重伤病人已稳定，准备转运。预计到达创伤中心时间：8 分钟。请求在阿拜大道开启 <red>绿波带</red>。' },
      ],
      recommendations: [
        { title: '启动创伤中心优先联动', reason: '最新报告显示 <red>1 人重伤</red>', action: '立即联系市创伤中心调度，开启绿色应急通道并预留 ICU 床位。' },
        { title: '扩大核心封锁范围', reason: '交警和无人机报告 <red>围观群众增加</red>', action: '将警戒范围从 100 米扩大到 300 米，并设置二级交通分流点。' },
        { title: '固定现场视频证据', reason: '会议流提到 <red>高速飙车</red>', action: '立即打包并提取卡口、交叉路口及前段路段的 15 分钟视频缓存。' },
        { title: '启动检察/法医通知', reason: '关键信息：报告 <red>3 人死亡</red>', action: '通知法医值班小组和检察联络员待命；同步死亡确认和证据链保存。' },
        { title: '接听接入的高优先级电话', reason: '来自 <red>市长办公室</red> 的来电', action: '建立安全语音连接并提供初步事件简报。' },
      ]
    },
    keyIntelligence: {
      title: '关键情报分析',
      searchPlaceholder: '搜索情报、坐标、实体...',
      accidentCoords: '事故坐标',
      replayTitle: '时空碰撞复现 (REPLAY)',
      eventWindow: '事件窗口',
      racingVehicles: '竞速车辆',
      opposingVehicles: '对向车辆',
      currentStatus: '当前状态',
      statusIdle: '等待回放',
      statusApproach: '高速轨迹逼近',
      statusConflict: '轨迹交汇风险上升',
      statusImpact: '碰撞发生',
      statusSecured: '事故区域封锁中',
      tags: {
        racing: '疑似非法赛车',
        majorCrash: '重大交通事故',
        reconstruction: '三车碰撞复现',
      },
      autoReplay: '自动回放',
      phases: {
        racing: '检测到竞速',
        conflict: '轨迹冲突',
        impact: '发生碰撞',
        secured: '现场封锁',
      },
      collisionDetails: {
        title: '碰撞事件详情',
        time: '时间',
        type: '类型',
        energy: '能量指数',
        casualty: '伤亡评估',
        typeValue: '高速正面碰撞',
        casualtyValue: '极高',
      },
      majorIncidentArea: '重大事故区域',
      live: '实时',
      collision: '碰撞',
      speed: '公里/小时',
      replaying: '回放中',
      surveyRecon: '现场勘查复现',
      physicalMap: '物理生成图',
      digitalMap: '数字生成图',
      nebulaMap: '设备星云点云图',
      imageGenerating: '图像生成中...',
      noData: '无数据',
      digitalAnalysis: '数字生成图 - 深度分析',
      digitalExtraction: '数字特征提取',
      closeDetails: '关闭详情',
      digitalFeatures: [
        "1. 断指 (生物特征)",
        "2. 破碎手机 (通信终端)",
        "3. 散落零件 (机械碎片)",
        "4. 刹车痕迹 (物理矢量)",
        "5. 玻璃碎片 (折射特征)",
        "6. 驾驶员生物特征 (DNA)",
        "7. 碰撞角度数据 (几何)",
        "8. 速度矢量线 (动力学)",
        "9. 安全气囊残留物 (化学)",
        "10. 燃油泄漏范围 (环境)",
        "11. 轮胎磨损特征 (痕迹)",
        "12. 道路标记偏移 (空间)",
        "13. 盲区补全 (视觉)",
        "14. 环境光模拟 (光学)",
        "15. 频谱分析 (声学)",
        "16. 车辆底盘损坏 (结构)",
        "17. 电池组热失控风险 (热能)",
        "18. 乘客姿态重建 (姿态)",
        "19. 瞬时加速度 (机械)",
        "20. 避让路径偏差 (决策)"
      ],
      recon: {
        rendering: '视频渲染中...',
        waiting: '等待指令',
        engineActive: '渲染引擎已激活',
        engineStandby: '引擎待命',
        btnRecon: '现场事故复现',
      },
      scenarios: {
        recon: {
          title: '事故复现',
          desc: '基于多源视频融合与物理引擎模拟，1:1还原事故发生瞬间。通过激光雷达点云与监控视频拟合，精确计算碰撞角度、受力分布及避让轨迹。',
        },
        spatio: {
          title: '时空分析',
          desc: '通过地理位置与事件数据的时空交叉计算，获取数据洞察。系统自动追溯事故前15分钟内所有轨迹异常，识别两辆对向行驶车辆的潜在碰撞风险。',
        },
        corr: {
          title: '关系分析',
          desc: '穿透人、地、事、物、组织五大本体，自动构建80+实体关系图谱。识别肇事者社交圈、资金往来及历史违章记录，挖掘深层社会网络。',
        },
        cross: {
          title: '交叉计算',
          desc: '多维数据碰撞引擎。对LBS信号、卡口数据、移动支付记录进行多点交叉验证，确保情报分析的唯一性与准确性，排除虚假目标干扰。',
        }
      },
      reconSteps: [
        "收集了6个事故相关帖子、16个网页和25个视频。",
        "建立了时间线，详细说明了过程：“驾驶 - 失控 - 碰撞 - 封锁”。",
        "提取了核心信息：时间、地点、人物、车辆、环境。",
        "重建了阿尔法拉比大街事故路段的空间结构。",
        "整理了两辆涉事车辆的行驶方向和相对位置。",
        "构建了视觉资产库：道路、车辆、建筑、监控、人群。",
        "绘制了第一张关键帧：事故前的正常驾驶。",
        "添加了细节：交通流、路灯、监控杆、建筑、路标。",
        "绘制了第二张关键帧：撞击后的静态场景。",
        "添加了碎片、刹车痕迹、紧急停车的车辆和围观者。",
        "绘制了第三张关键帧：警察到达和道路封锁。",
        "扩展了：警车、救护车、围观者和交通拥堵。",
        "生成了0-5秒的车辆驾驶视频片段。",
        "生成了5-10秒的车辆失控撞击视频片段。",
        "生成了10-20秒的警察到达和封锁视频片段。",
        "添加了摄像机放大、缩小、倾斜和过渡控制。",
        "配置了音频：交通、撞击、警报和现场骚乱。",
        "添加了字幕：时间、地点和阶段描述。",
        "统一了黑白线条画风格和整体节奏。",
        "输出了20秒的事件重建视频和3张关键帧图像。"
      ],
      surveySteps: [
        "现场图像要素采集",
        "现场要素整理",
        "空间特征匹配",
        "物理碰撞参数计算",
        "现场全景绘制"
      ]
    },
    executiveDrafting: {
      title: '公文拟制',
      subtitle: 'AI 治国理政',
      interfaceVersion: '公文生成界面 v2.0',
      engineReady: 'AI 引擎就绪',
      selectTemplate: '选择模板',
      contextualInputs: '上下文输入',
      targetAudience: '目标受众',
      securityClassification: '安全等级',
      intelligenceSources: '情报来源',
      startGeneration: '开始生成',
      drafting: '拟稿中...',
      workspace: '拟稿工作区',
      waiting: '等待生成...',
      aiDrafting: 'AI 正在拟稿...',
      executionFlow: '执行流程',
      auditLog: '审计日志',
      print: '打印',
      export: '导出',
      submitApproval: '提交审批',
      engineNominal: '拟稿引擎：正常',
      sopValidation: 'SOP 验证：激活',
      region: '区域：ASIA-SOUTH-1',
      build: '构建：2026.04.09_REL-DRAFTING',
      copyright: '© 2026 AEGIS 防务系统',
      expandedWorkspace: '扩展拟稿工作区',
      ministry: '内政部',
      bureau: '国家安全局',
      confidential: '机密',
      ref: '编号',
      refinePlaceholder: '完善草案（例如，“使其更正式”）...',
      refineExpandedPlaceholder: '在扩展视图中完善草案...',
      applyRefinement: '应用完善',
      audiences: ['公开版', '部长级', '总统简报', '仅限内部'],
      securityLevels: ['绝密', '机密', '内部'],
      sources: ['社交媒体', '网络情报', '警方记录', '视频资料'],
      draftTypes: {
        official_document: {
          title: '正式公文',
          desc: '生成正式公文、请求、通知、报告和传阅文件',
        },
        press_release: {
          title: '新闻稿',
          desc: '针对舆情事件、权威公告和公开声明生成新闻稿',
        },
        leadership_brief: {
          title: '领导简报',
          desc: '为部长、总统 or 特别工作组生成高层总结材料',
        },
        public_opinion_report: {
          title: '舆情报告',
          desc: '生成关于舆情传播、关注点、风险和应对建议的专项报告',
        },
        sop_disposal_draft: {
          title: 'SOP 处置草案',
          desc: '基于警方 SOP 生成应对建议和行动草案',
        },
        circulation_package: {
          title: '传阅包',
          desc: '生成用于会签、审批、分发、打印和归档的材料',
        }
      },
      steps: {
        press_release: [
          { title: '接收新闻稿请求', desc: '识别稿件类型为“舆情事件新闻稿”' },
          { title: '加载新闻稿模板与规则', desc: '匹配媒体发布模板与警方 SOP 公开表达规则' },
          { title: '读取社交媒体、网络、视频及警方来源', desc: '汇总多源情报输入并进行有效性筛选' },
          { title: '提取核心事件要素', desc: '提取时间、地点、人员、车辆、处置行动及状态信息' },
          { title: '通过警方 SOP 结构拟稿', desc: '构建标题、导语、事件详情、处置进展及官方结论' },
          { title: '优化措辞并清理敏感内容', desc: '进行措辞纠正、一致性检查及敏感信息移除' },
          { title: '生成最终新闻稿', desc: '生成可发布版本并同步至预览、打印、保存及分发区域' }
        ],
        official_document: [
          { title: '接收正式公文任务', desc: '识别稿件类型：汇报材料' },
          { title: '识别公文类别', desc: '匹配请示/报告/督办/通知规范' },
          { title: '读取事项背景及事件材料', desc: '提取事项背景及前期情况汇总' },
          { title: '提取汇报要点及办理建议', desc: '生成主送单位及公文标题' },
          { title: '通过正式格式生成正文', desc: '编排正文结构及办理建议' },
          { title: '纠正文体及措辞标准', desc: '完成公文文体纠偏' },
          { title: '生成最终正式草案', desc: '生成初步公文草案' }
        ],
        leadership_brief: [
          { title: '接收领导简报任务', desc: '识别简报目标：总统简报' },
          { title: '将情报压缩为执行摘要', desc: '将多源情报压缩为领导可读的执行摘要' },
          { title: '识别领导关注要点', desc: '提取4个需要领导关注的关键点' },
          { title: '生成“情况-判断-建议”结构', desc: '生成“情况-判断-建议”结构' },
          { title: '形成初步简报草案', desc: '形成初步简报草案' },
          { title: '输出总统审阅版简报', desc: '输出总统审阅版简报' }
        ]
      },
      content: {
        press_release: [
          { title: '标题', content: '关于3.21阿拉木图重大交通事故处置进展的权威公告' },
          { title: '导语', content: '2026年3月21日凌晨，阿拉木图阿尔法拉比大街发生多车碰撞事故。目前，现场处置已基本结束，相关调查工作正有序开展。' },
          { title: '事件概况', content: '事故发生于凌晨2:15，涉及3辆私家车和1辆轻型货车。初步判断为超速行驶引发的连锁碰撞。' },
          { title: '警方响应进展', content: '警方立即封锁现场，医疗部门救治了4名伤者。目前道路交通已恢复正常，涉事车辆已拖离。' },
          { title: '当前权威结论', content: '经初步检测，主要责任人涉嫌酒后驾驶，相关生物样本已送检。' },
          { title: '结语', content: '请广大市民不信谣、不传谣，关注官方后续公告。' }
        ],
        leadership_brief: [
          { title: '情况汇总', content: '3.21事故造成4人受伤；社会关注度极高，需防止舆情升级。' },
          { title: '核心判断', content: '事故主责明确，但涉及外籍人员，需注意外事协调。' },
          { title: '当前处置状态', content: '现场已清理完毕，伤者伤情稳定。' },
          { title: '需领导关注事项', content: '1. 社交媒体上虚假视频的传播；2. 伤者家家属的情绪安抚。' },
          { title: '下一步建议', content: '建议由市局统一发布权威公告，并启动二级舆情应对预案。' }
        ],
        public_opinion_report: [
          { title: '标题', content: '关于3.21阿拉木图交通事故舆情传播的专项报告' },
          { title: '传播概况', content: '该事件在4小时内通过 Telegram 和 Instagram 达到了 200万+ 的曝光量。情绪倾向为 65% 负面，主要集中在非法赛车传闻。' },
          { title: '关键关注点', content: '1. Zeekr 驾驶员的身份；2. 所谓警察参与赛车的指控；3. 应急响应速度。' },
          { title: '风险评估', content: '如果官方澄清延迟超过12小时，存在线下抗议的高风险。' },
          { title: '应对建议', content: '立即发布执法记录仪画面，以破除赛车传闻并突出救援努力。' }
        ],
        official_document: [
          { title: '标题', content: '关于加强夜间时段交通安全管理的通知' },
          { title: '背景', content: '鉴于阿尔法拉比大街发生的重大事故，有必要强化夜间巡逻和卡口作业。' },
          { title: '指令', content: '1. 巡逻频率增加 50%；2. 在10个关键路口部署移动雷达单元；3. 进行严格的酒精测试检查。' },
          { title: '执行', content: '各区局必须在今天下午 6:00 前提交其部署计划。' }
        ],
        sop_disposal_draft: [
          { title: '标题', content: '高速碰撞事件 SOP 处置草案' },
          { title: '初始行动', content: '封锁 500米 半径，激活应急车道，通知最近的一级创伤中心。' },
          { title: '证据保存', content: '确保所有 VMS 数据安全，对撞击核心进行 3D 激光扫描，扣押所有涉事电子设备。' },
          { title: '通信协议', content: '与指挥中心建立安全链接，每 15分钟 提供一次更新。' }
        ],
        circulation_package: [
          { title: '标题', content: '传阅包：3.21 事件初步调查报告' },
          { title: '分发名单', content: '内政部长、阿拉木图警察局长、市检察院。' },
          { title: '审批状态', content: '等待法律部门会签。' }
        ]
      }
    },
    officialVehicles: {
      title: '公务车辆异常溯源',
      subtitle: '异常监测、审核及结案工作流',
      activeCase: '活跃案件',
      legacyPage: '旧版页面',
      compareMode: '比对模式',
      kpis: {
        activeExceptions: '活跃异常',
        highSeverity: '高严重性',
        inReview: '审核中',
        awaitingDispatch: '等待调度',
        longestDelay: '最长延迟',
        unarchivedCases: '未归档案件',
      },
      lifecycle: {
        title: '异常生命周期溯源',
        completed: '已完成',
        pending: '待处理',
        delayed: '已延迟',
      },
      analytics: {
        title: '溯源分析',
        longestDelay: '最长延迟',
        reviewRework: '审核返工',
        blockers: '阻碍因素',
        closureRate: '结案率',
        bottleneck: '关键瓶颈',
        bottleneckDesc: '北区汽车维修验证目前因缺少进入日志而被阻断。',
      },
      workspaces: {
        title: '相关工作区',
        originalDetail: '原始详情',
        maintenanceQueue: '维修队列',
        mapMonitor: '地图监控',
        graphWorkspace: '图谱工作区',
        videoPanel: '视频面板',
        archiveRecord: '档案记录',
      },
      ui: {
        hideAnalytics: '隐藏溯源分析',
        showAnalytics: '显示溯源分析',
        evidenceSync: '证据同步：活跃',
        reviewFullCase: '查看完整案件',
      },
      mockData: {
        cases: {
          case1: {
            desc: '维修预算超过 150%；北区汽车维修站无进场记录。',
            action: '需要立即进行实地检查和驾驶员访谈。'
          },
          case2: {
            desc: '常规维护提前完成。',
            action: '无。归档完成。'
          },
          case3: {
            desc: '通过 OBD 检测到硬件异常磨损。',
            action: '安排技术审计。'
          }
        },
        nodes: {
          detected: '已检测',
          verified: '已核实',
          assigned: '已分配',
          maintenance: '维修中',
          reviewed: '已审核',
          archived: '已归档'
        },
        stats: {
          mission: '执行任务中',
          idle: '空闲',
          maintenance: '维修中',
          scrapped: '已报废'
        },
        ledger: {
          title: '维修队列',
          activeTitle: '执行任务车队',
          anomalyDetected: '检测到台账异常',
          anomalyDesc: '台账警告：维修预算超过 150%；注册维修站（北区汽车维修站）报告过去两个月内该车辆无进场记录。'
        }
      }
    },
    policePersonnel: {
      ledger: {
        title: '人员台账',
        active: '在岗',
        onLeave: '休假',
        suspended: '停职',
        search: '搜索人员...',
        standby: '待命',
        inTraining: '培训中',
        forceStatus: '阿拉木图警力状态',
        statsByType: '按警种统计',
        statsByDistrict: '按分局统计',
        unit: '单位',
        keyAnomalies: '102 分局关键异常',
        unitFocus: '102 分局重点',
        critical: '高危',
        normal: '正常',
        stats: {
          total: '总人数',
          active: '在岗',
          special: '特警',
          risk: '高风险'
        },
        types: {
          publicSecurity: '治安警察',
          trafficPolice: '交通警察',
          criminalInvestigation: '刑事侦查',
          swat: '特警',
          cyberSecurity: '网络安全',
          narcotics: '禁毒',
          internalAdmin: '内部行政',
          municipalDirect: '市局直属',
          trafficBureau: '交警支队',
          cid: '刑侦支队',
          specialOps: '特战队',
          cyberBureau: '网安支队',
          narcoticsBureau: '禁毒支队',
          generalOffice: '办公室'
        },
        districts: {
          district102: '102 分局',
          bostandyk: '波斯坦德克分局',
          zhetysu: '杰特苏分局',
          medeu: '梅德乌分局',
          turksib: '图尔克西布分局',
          alatau: '阿拉套分局',
          airport: '机场分局',
          nauryzbay: '瑙雷兹拜分局'
        },
        tags: {
          assetAnomaly: '资产异常',
          abuseOfPower: '滥用职权',
          gangSuspect: '团伙嫌疑',
          frequentComplaints: '频繁投诉',
          disciplinedSlack: '纪律涣散',
          poorPerformance: '表现不佳',
          unstableEmotion: '情绪不稳定',
          illegalExit: '非法出境'
        }
      },
      hologram: {
        profile: '人员画像',
        rank: '职级',
        id: '警号',
        unit: '单位',
        specialization: '专业',
        clearance: '权限等级',
        biometrics: '生物特征状态',
        heartRate: '心率',
        stress: '压力指数',
        location: '当前位置',
        selectPersonnel: '选择人员以加载全息画像',
        records: '记录',
        operations: '行动',
        aiInference: 'AI 异常推断',
        analyzing: '分析中...',
        stats: {
          internalBadgeId: '内部警号',
          passportStatus: '护照状态',
          submittedToIA: '已上交内务部',
          issuedWeapon: '配发武器',
          bodycamMac: '执法仪 MAC',
          officeTerminalIp: '办公终端 IP',
          mobileTerminalIp: '移动终端 IP',
          tabletTerminalIp: '平板终端 IP',
          bloodTypeDna: '血型 / DNA',
          storedInDatabase: '已入库',
          politicalStatus: '政治面貌',
          rulingPartyMember: '执政党党员',
          maritalStatus: '婚姻状况',
          divorced: '离异',
          financialStatus: '财务状况',
          recentLargeCredit: '近期大额信贷',
          psychologicalMedical: '心理 / 医疗',
          insomniaAnxiety: '失眠与焦虑 / 高心率',
          primaryVehicle: '主要车辆',
          residentialAddress: '居住地址',
          emergencyContact: '紧急联系人',
          bankCards: '银行卡',
          cardsAnomaly: '4张 (1张异常)',
          frequentBaseStations: '频繁基站',
          frequentRf: '频繁射频'
        },
        anomalies: {
          spatioTemporal: '时空异常',
          spatioTemporalDesc: '深夜 (02:00-04:00) 频繁违规出现在非辖区区域 (高端俱乐部)。',
          physiological: '生理异常',
          physiologicalDesc: '智能手环数据表明近期存在严重的健康问题，任务期间心率极高，暗示存在未申报的药物依赖。',
          commFinancial: '通信与财务异常',
          commFinancialDesc: '频繁使用规避手段联系海外号码，且直系亲属名下出现多笔来自未知壳公司的海外转账。'
        }
      },
      intelligence: {
        title: '人员情报网络',
        nodes: '节点',
        edges: '关系',
        engine: '引擎',
        secureEnclave: '安全领地',
        liveSync: '实时同步',
        systemActive: '系统活跃',
        entities: '实体',
        standard: '标准',
        highRisk: '高风险',
        medRisk: '中风险',
        confidence: '置信度',
        confirmed: '已确认',
        inferred: '推断',
        alleged: '据称',
        signalLost: '信号丢失',
        activeBaseStation: '活跃基站',
        signalTraffic: '信号流量',
        spoofingWarning: '设备信号欺骗警告：警用终端 GPS 手动屏蔽 45 分钟，期间运营商私有设备移动至 3.21 事故核心区域。',
        ontologyExpanded: '实体关系本体 (已展开)',
      }
    },
    ontology: {
      title: '实体关系本体 (扩展)',
      nodes: '节点',
      edges: '关系',
      engine: '引擎',
      secureEnclave: '安全领地',
      liveSync: '实时同步',
      systemActive: '系统活跃',
      entities: '实体',
      standard: '标准',
      highRisk: '高风险',
      medRisk: '中风险',
      confidence: '置信度',
      confirmed: '已确认',
      inferred: '推断',
      alleged: '据称',
      clusters: {
        infrastructure: '车辆与基础设施',
        unknown: '未知网络',
        media: '媒体与监督'
      }
    },
    exploration: {
      title: '智能勘探',
      subtitle: '部长 AI 治国理政',
      postIncident: '事后分析',
      search: '搜索数据库 / 表 / 实体',
      kpis: {
        connected: '已连接数据库',
        tables: '逻辑表',
        governed: '已治理',
        activeTasks: '活跃任务',
        mappings: '实体映射'
      },
      latency: '延迟',
      secureEnclave: '安全领地',
      operator: '操作员',
      progress: {
        title: '数据治理与语义理解进度',
        subtitle: '查询了 {total} 张表，已完成 {completed} / {total}'
      },
      flow: {
        title: '勘探流程',
        steps: ['摄取', '治理', '理解', '计算', '组装']
      },
      engine: {
        title: '语义引擎'
      },
      agent: {
        title: '勘探代理',
        subtitle: '语义上下文引擎',
        btnStart: '开始智能勘探',
        ready: '就绪',
        desc: '自动理解多源异构数据，构建案例级问答语义上下文。',
        contextGenerated: '案例语义上下文已生成。您可以询问有关人员、车辆、通信、轨迹、支付等问题。',
        placeholder: '询问数据上下文...',
        assistantResponse: '正在根据当前案例上下文进行深度分析...'
      },
      insightSuggestions: [
        {
          title: '比对关键时间窗口内涉事车辆的跨库活动轨迹',
          desc: '查询轨迹、卡口、LBS和支付数据，识别同伴、尾随、会面或异常绕路。'
        },
        {
          title: '提取事件发生前后的异常通信和高频关系对象',
          desc: '根据电话号码、即时通讯、通信、共享位置和社交关系过滤高相关联系人和潜在共同参与者。'
        },
        {
          title: '自动还原“人-车-地-时”4D案例链',
          desc: '生成案例时空图，识别关键停留点、时间窗口和设备节点。'
        }
      ]
    }
  },
  kk: {
    assetMonitoring: {
      title: 'Полиция активтерінің аномалияларын бақылау',
      normal: 'ҚАЛЫПТЫ',
      overdue: 'МЕРЗІМІ ӨТКЕН',
      abuse: 'ТЕРІС ПАЙДАЛАНУ',
      suspectedClone: 'Клон/Жеке пайдалану күдігі',
      bodyCamOverdue: 'Мерзімі өткен',
      analysisDetail: 'Теріс пайдалануды талдау мәліметтері',
      dataComparison: 'Деректерді салыстыру',
      registryInfo: 'Тіркеу ақпараты',
      captured: 'Түсірілген',
      result: 'Нәтиже',
      signalOverlap: 'Сигналдардың сәйкестігін талдау',
      overlapScore: 'Сәйкестік ұпайы',
      officerGps: 'Қызметкер GPS-і мен Көлік GPS-і',
      deviceGps: 'Құрылғы GPS-і: Жатақхана',
      vehicleGps: 'Көлік GPS-і: Тас жол',
      issueOrder: 'Тексеру бұйрығын шығару',
      markFalsePositive: 'Жалған оң деп белгілеу',
      registryToyota: "Ақ Toyota A6",
      registryDistrict: "Аудан: Шығыс қала",
      registryStatus: "Күйі: Қоймада",
      capturedZeekr: "Қара Zeekr 001",
      capturedLocation: "Орны: Батыс қала",
      capturedTime: "Уақыты: 02:45 (Жұмыс емес уақыт)",
      assets: [
        { name: 'Ақ Toyota (A88888)', applicant: 'Бастық орынбасары - А', details: 'Клон/Жеке пайдалану күдігі' },
        { name: 'Бейнекамера - B2', applicant: 'Патруль - Жан', details: 'Мерзімі өткен' },
        { name: 'Патрульдік көлік - C5', applicant: 'Жол полициясы - Ли' },
        { name: 'Мобильді терминал - M1', applicant: 'Инспектор - Ван' },
      ]
    },
    highRiskMonitoring: {
      title: 'Әлеуметтік жоғары қауіпті бақылау',
      threshold: 'Қауіп шегінің іске қосылуы',
      highRisk: 'ЖОҒАРЫ ҚАУІП',
      reasons: {
        speeding: 'Түнгі жылдамдықты асыру/Шағымдар',
        gathering: 'Аномальды жиналу туралы ескерту',
        overlap: 'Траекторияның аномальды сәйкестігі',
        access: 'Сезімтал аймақтарға жиі кіру'
      },
      list: [
        { name: 'Қара Zeekr (Нөмірсіз)', reason: 'Түнгі жылдамдықты асыру/Шағымдар' },
        { name: 'Негізгі тұлға - Жан', reason: 'Аномальды жиналу туралы ескерту' },
        { name: 'Күміс Mercedes (B12345)', reason: 'Траекторияның аномальды сәйкестігі' },
        { name: 'Қатысты тұлға - Ли', reason: 'Сезімтал аймақтарға жиі кіру' },
      ]
    },
    emergencyCmd: {
      incidentProfile: 'Оқиға профилі',
      active: 'БЕЛСЕНДІ',
      id: 'ID',
      status: 'Күйі',
      location: 'Орны',
      situationSummary: 'Жедел жағдайдың қысқаша мазмұны',
      fatalities: 'Қайтыс болғандар',
      criticalInjured: 'Ауыр жараланғандар',
      policeUnits: 'Полиция бөлімшелері',
      medicalTeams: 'Медициналық топтар',
      intelligenceStream: 'Барлау ағыны',
      coordinationRoom: 'Үйлестіру бөлмесі',
      liveStream: 'ТІКЕЛЕЙ ЭФИР',
      aiDecisionSupport: 'AI шешімдерін қолдау',
      trigger: 'Триггер',
      accept: 'Қабылдау',
      reject: 'Қабылдамау',
      liveIncident: 'Тікелей оқиға',
      incidentStates: [
        "03:29 Бірінші жөнелту. Әл-Фараби даңғылында жоғары жылдамдықты соқтығысу. Бастапқыда 1 адам қайтыс болды. Төтенше жағдайлар бөлімшелері негізгі аймаққа асығып жатыр.",
        "Құтқару жұмыстары қызу жүріп жатыр. Үйінді астынан тағы да адамдар табылды. Қайтыс болғандар саны 4-ке жетті. Айналадағы жолдар физикалық түрде оқшауланған.",
        "Медициналық бағалау аяқталды. Өте тұрақсыз өмірлік көрсеткіштері бар 1 жаралы травматологиялық орталыққа жіберілді. Қорытынды: 3 адам қайтыс болды, 1 адам ауыр жарақат алды. Дәлелдемелер жинау жалғасуда."
      ],
      conferenceSeeds: [
        { role: 'Командалық үстел', message: 'Апаттың негізгі орнын растау, <red>Ірі жол-көлік оқиғасына ден қою</red> шараларын бастау. Біріншіден, зардап шеккендер санын, өтуге болатын жолақтарды және қайталама соқтығысу қаупін анықтау.' },
        { role: 'ҰҰА барлауы', message: 'Орында. Жоғарыдан түсірілген кадрлар алдыңғы жақтың қатты соқтығысқанын, орталық аймақтың толығымен бұғатталғанын көрсетеді. <red>Соққы өзегі</red> бастапқыда негізгі жолдың ортасында деп бағаланды.' },
        { role: 'Жедел жәрдем', message: 'Mercedes-те кем дегенде <red>3 жауапсыз адамды</red> көріп тұрмыз. Жолдағы тағы бір жаралы адам басқа көліктен болуы мүмкін, күйі <red>Критикалық</red>.' },
        { role: 'Жол қозғалысын бақылау', message: 'Шығысқа бағытталған қозғалыс баяулады, бірақ батыстан көліктер әлі де келіп жатыр. Шұғыл түрде <red>Екі жақты оқшаулауды</red> және апаттық жолақтарды тазартуды ұсынамын.' },
        { role: 'Өрт сөндіру қызметі', message: 'Қабылданды. Жолаушылар жағы мен алдыңғы кабина қатты жаншылған, гидравликалық таратқыштар енгізілуде. Өрт көрінбейді, бірақ электр және жанармай ағу қаупі бар.' },
        { role: 'Аурухана байланысы', message: 'Травматологиялық орталықта 1 жедел жәрдем орны және 1 реанимациялық төсек дайындалды. <red>Критикалық жарақат</red> алған адамның тасымалдауға тұрақты екенін тез арада растаңыз.' },
        { role: 'Командалық үстел', message: 'Барлық бөлімшелерге қабылданды. Жол полициясы периметрді 500 метрге дейін кеңейтеді. Жедел жәрдем <red>Критикалық пациентке</red> басымдық береді. ҰҰА күдікті көліктің қашу жолын жоғарыдан бақылауды жалғастырады.' },
        { role: 'Далалық бөлімше', message: 'Күдікті көлік <red>Zeekr 001 FR</red> ретінде анықталды, мемлекеттік нөмірі KZ 102 POL. Қазір LBS сигналдары мен бақылау-өткізу пункттерінің тарихы тексерілуде.' },
        { role: 'Барлау', message: 'LBS сәйкестігі табылды. Күдіктінің телефоны <red>Сайран көлінің</red> жанында белсенді. Сигнал тез қозғалып жатыр. Ұстау үшін жергілікті бөлімшемен үйлестіру жүргізілуде.' },
        { role: 'Командалық үстел', message: 'Түсінікті. Сайран көлінің жанындағы барлық бөлімшелер, <red>Жоғары жылдамдықты ұстауға</red> дайындалыңыз. Сақтық көшірмесіз әрекет етпеңіз.' },
        { role: 'Медициналық бақылаушы', message: 'Критикалық пациент тасымалдауға тұрақтандырылды. Травматологиялық орталыққа жету уақыты: 8 минут. Абай даңғылында <red>Жасыл толқынды</red> сұраймыз.' },
      ],
      recommendations: [
        { title: 'Травматологиялық орталықтың басым байланысын бастау', reason: 'Соңғы есепте <red>1 Критикалық жарақат</red> көрсетілген', action: 'Қалалық травматологиялық орталықтың диспетчерімен дереу хабарласыңыз, жасыл жедел арнаны ашыңыз және реанимациялық төсекті брондаңыз.' },
        { title: 'Негізгі оқшаулау периметрін кеңейту', reason: 'Жол полициясы мен ҰҰА <red>Көрермендердің көбейгенін</red> хабарлайды', action: 'Периметрді 100 метрден 300 метрге дейін кеңейтіңіз және екінші деңгейлі жол қозғалысын бұру нүктелерін орнатыңыз.' },
        { title: 'Оқиға орнындағы бейне дәлелдемелерді қамтамасыз ету', reason: 'Конференция ағынында <red>Жоғары жылдамдықты жарыс</red> туралы айтылады', action: 'Бақылау-өткізу пункттерінен, қиылыстардан және алдыңғы жол сегменттерінен 15 минуттық бейне кэшті дереу жинап алыңыз.' },
        { title: 'Прокуратураны / Сот-медициналық сараптаманы хабардар ету', reason: 'Негізгі ақпарат: <red>3 адам қайтыс болды</red>', action: 'Сот-медициналық кезекші топқа және прокуратура байланысына хабарлаңыз; өлімді растау мен дәлелдемелер тізбегін сақтауды синхрондаңыз.' },
        { title: 'Кіріс жоғары басымдықты қоңырауға жауап беру', reason: '<red>Қала әкімдігінен</red> кіріс қоңырау', action: 'Қауіпсіз дауыстық байланыс орнатыңыз және оқиға туралы алдын ала ақпарат беріңіз.' },
      ]
    },
    keyIntelligence: {
      title: 'Негізгі барлау талдауы',
      searchPlaceholder: 'Барлауды, координаттарды, субъектілерді іздеу...',
      accidentCoords: 'Апат координаттары',
      replayTitle: 'Кеңістіктік-уақыттық соқтығысуды қайталау (REPLAY)',
      eventWindow: 'Оқиға терезесі',
      racingVehicles: 'Жарыс көліктері',
      opposingVehicles: 'Қарсы көліктер',
      currentStatus: 'Қазіргі күйі',
      statusIdle: 'Қайталауды күтуде',
      statusApproach: 'Жоғары жылдамдықты траекторияның жақындауы',
      statusConflict: 'Траекторияның қиылысу қаупі артуда',
      statusImpact: 'Соқтығысу орын алды',
      statusSecured: 'Апат аймағы оқшауланды',
      tags: {
        racing: 'Көше жарысы күдігі',
        majorCrash: 'Ірі апат',
        reconstruction: '3 көлікті реконструкциялау',
      },
      autoReplay: 'Автоматты қайталау',
      phases: {
        racing: 'Жарыс анықталды',
        conflict: 'Конфликт',
        impact: 'Соққы',
        secured: 'Қорғалған',
      },
      collisionDetails: {
        title: 'Соқтығысу оқиғасының мәліметтері',
        time: 'Уақыты',
        type: 'Түрі',
        energy: 'Энергия индексі',
        casualty: 'Зардап шеккендерді бағалау',
        typeValue: 'Жоғары жылдамдықты бетпе-бет соқтығысу',
        casualtyValue: 'Өте жоғары',
      },
      majorIncidentArea: 'НЕГІЗГІ ОҚИҒА АЙМАҒЫ',
      live: 'ТІКЕЛЕЙ',
      collision: 'СОҚТЫҒЫСУ',
      speed: 'км/сағ',
      replaying: 'ҚАЙТАЛАУДА',
      surveyRecon: 'Оқиға орнын зерттеуді реконструкциялау',
      physicalMap: 'Физикалық генерация картасы',
      digitalMap: 'Цифрлық генерация картасы',
      nebulaMap: 'Құрылғының тұманды нүктелік бұлт картасы',
      imageGenerating: 'Сурет жасалуда...',
      noData: 'Деректер жоқ',
      digitalAnalysis: 'Цифрлық генерация картасы - Терең талдау',
      digitalExtraction: 'Цифрлық мүмкіндіктерді шығару',
      closeDetails: 'Мәліметтерді жабу',
      digitalFeatures: [
        "1. Кесілген саусақ (Биометриялық)",
        "2. Сынған телефон (Байланыс терминалы)",
        "3. Шашылған бөлшектер (Механикалық қоқыс)",
        "4. Тежеу іздері (Физикалық вектор)",
        "5. Шыны сынықтары (Сыну мүмкіндігі)",
        "6. Жүргізушінің биометриясы (ДНҚ)",
        "7. Соқтығысу бұрышының деректері (Геометриялық)",
        "8. Жылдамдық векторының сызықтары (Динамика)",
        "9. Қауіпсіздік жастығының қалдықтары (Химиялық)",
        "10. Жанармай ағу ауқымы (Экологиялық)",
        "11. Шинаның тозу сипаттамалары (Із)",
        "12. Жол таңбасының ауытқуы (Кеңістіктік)",
        "13. Соқыр нүктені толтыру (Визуалды)",
        "14. Қоршаған орта жарығын модельдеу (Оптикалық)",
        "15. Дыбыс спектрін талдау (Акустикалық)",
        "16. Көлік шассиінің зақымдануы (Құрылымдық)",
        "17. Батарея жинағының термиялық қашу қаупі (Термиялық)",
        "18. Жолаушының қалпын реконструкциялау (Қалпы)",
        "19. Лездік үдеу (Механикалық)",
        "20. Жалтару жолының ауытқуы (Шешім)"
      ],
      recon: {
        rendering: 'Бейне көрсетілуде...',
        waiting: 'Команданы күтуде',
        engineActive: 'RENDERING_ENGINE_ACTIVE',
        engineStandby: 'ENGINE_STANDBY',
        btnRecon: 'Оқиға орнындағы апатты реконструкциялау',
      },
      scenarios: {
        recon: {
          title: 'Апатты реконструкциялау',
          desc: 'Көп көзді бейне біріктіру және физикалық қозғалтқышты модельдеу негізінде апат сәтін 1:1 реконструкциялау. LiDAR нүктелік бұлты мен бақылау бейнесін сәйкестендіру арқылы соқтығысу бұрыштарын, күштің таралуын және жалтару траекторияларын дәл есептеңіз.',
        },
        spatio: {
          title: 'Кеңістіктік-уақыттық талдау',
          desc: 'Географиялық орналасу мен оқиға деректерін кеңістіктік-уақыттық қиылысу арқылы есептеу арқылы деректер туралы түсінік алыңыз. Жүйе апатқа дейін 15 минут бұрынғы барлық траекториялық аномалияларды автоматты түрде қадағалап, бір-біріне қарай келе жатқан екі көліктің ықтимал соқтығысу қаупін анықтайды.',
        },
        corr: {
          title: 'Байланысты талдау',
          desc: '80-нен астам субъектілер байланысының графиктерін автоматты түрде құру үшін бес негізгі онтологияға: адамдарға, орындарға, оқиғаларға, заттарға және ұйымдарға еніңіз. Терең әлеуметтік желілерді ашу үшін қылмыскердің әлеуметтік ортасын, қаржылық операцияларын және тарихи бұзушылықтарын анықтаңыз.',
        },
        cross: {
          title: 'Қиылысу есебі',
          desc: 'Көп өлшемді деректер соқтығысу қозғалтқышы. Барлау талдауының бірегейлігі мен дәлдігін қамтамасыз ету, жалған нысана кедергілерін жою үшін LBS сигналдарын, бақылау-өткізу пункттерінің деректерін және мобильді төлем жазбаларын көп нүктелі қиылысу арқылы тексеруді орындаңыз.',
        }
      },
      reconSteps: [
        "Апатқа қатысты 6 жазба, 16 веб-бет және 25 бейне жиналды.",
        "Уақыт шкаласы құрылды, процесті егжей-тегжейлі сипаттайды: 'Жүргізу - Бақылаудан шығу - Соқтығысу - Оқшаулау'.",
        "Негізгі ақпарат алынды: уақыты, орны, адамдар, көліктер, қоршаған орта.",
        "Әл-Фараби даңғылындағы апат бөлігінің кеңістіктік құрылымы қайта жасалды.",
        "Қатысқан екі көліктің қозғалыс бағыттары мен салыстырмалы позициялары реттелді.",
        "Визуалды активтер кітапханасы құрылды: жолдар, көліктер, ғимараттар, бақылау, адамдар.",
        "1-ші негізгі кадр салынды: Апатқа дейінгі қалыпты жүргізу.",
        "Мәліметтер қосылды: көлік ағыны, көше шамдары, бақылау бағаналары, ғимараттар, жол белгілері.",
        "2-ші негізгі кадр салынды: Соққыдан кейінгі статикалық көрініс.",
        "Қоқыстар, тежеу іздері, шұғыл тоқтаған көліктер және бақылаушылар қосылды.",
        "3-ші негізгі кадр салынды: Полицияның келуі және жолды жабу.",
        "Кеңейтілді: полиция көліктері, жедел жәрдем көліктері, бақылаушылар және кептеліс.",
        "0–5 секундтық көлік жүргізу бейне сегменті жасалды.",
        "5–10 секундтық көліктің бақылаудан шығып соқтығысу бейне сегменті жасалды.",
        "10–20 секундтық полицияның келуі және жолды жабу бейне сегменті жасалды.",
        "Камераны жақындату, алыстату, еңкейту және өтуді басқару элементтері қосылды.",
        "Аудио конфигурацияланды: көлік, соққы, сиреналар және оқиға орнындағы шу.",
        "Субтитрлер қосылды: уақыт, орын және кезең сипаттамалары.",
        "Ақ-қара сызықтық өнер стилі мен жалпы ырғағы біріктірілді.",
        "20 секундтық оқиғаны реконструкциялау бейнесі және 3 негізгі кадр кескіні шығарылды."
      ],
      surveySteps: [
        "Оқиға орнындағы сурет элементтерін жинау",
        "Оқиға орнындағы элементтерді реттеу",
        "Кеңістіктік сипаттарды сәйкестендіру",
        "Физикалық соқтығысу параметрлерін есептеу",
        "Оқиға орнының панорамасын салу"
      ]
    },
    executiveDrafting: {
      title: 'Атқарушылық жобалау',
      subtitle: 'AI МЕМЛЕКЕТТІК БАСҚАРУ',
      interfaceVersion: 'Құжаттарды генерациялау интерфейсі v2.0',
      engineReady: 'AI қозғалтқышы дайын',
      selectTemplate: 'Үлгіні таңдау',
      contextualInputs: 'Контекстік кірістер',
      targetAudience: 'Мақсатты аудитория',
      generateBtn: 'Құжатты жасау',
      generating: 'Генерациялануда...',
      audiences: ['ҚОҒАМДЫҚ ШЫҒАРЫЛЫМ', 'МИНИСТРЛІК ДЕҢГЕЙІ', 'ПРЕЗИДЕНТТІК БРИФИНГ', 'ТЕК ІШКІ ПАЙДАЛАНУ'],
      securityLevels: ['ӨТЕ ҚҰПИЯ', 'ҚҰПИЯ', 'ІШКІ'],
      sources: ['Әлеуметтік желілер', 'Веб-барлау', 'Полиция жазбалары', 'Бейне материалдар'],
      draftTypes: {
        official_document: {
          title: 'Ресми құжат',
          desc: 'Ресми құжаттарды, сұраныстарды, хабарламаларды, есептерді және тарату файлдарын жасау',
        },
        press_release: {
          title: 'Баспасөз хабарламасы',
          desc: 'Қоғамдық пікір оқиғалары, беделді бюллетеньдер және жария мәлімдемелер үшін баспасөз хабарламаларын жасау',
        },
        leadership_brief: {
          title: 'Басшылық брифингі',
          desc: 'Министрлер, президент немесе арнайы жедел топтар үшін жоғары деңгейдегі қорытынды материалдарды жасау',
        },
        public_opinion_report: {
          title: 'Қоғамдық пікір есебі',
          desc: 'Қоғамдық пікірдің таралуы, назар аударатын нүктелер, тәуекелдер және жауап беру ұсыныстары туралы арнайы есептерді жасау',
        },
        sop_disposal_draft: {
          title: 'SOP жою жобасы',
          desc: 'Полицияның SOP негізінде жауап беру ұсыныстары мен іс-қимыл жобаларын жасау',
        },
        circulation_package: {
          title: 'Тарату пакеті',
          desc: 'Қол қою, бекіту, тарату, басып шығару және мұрағаттау материалдарын жасау',
        }
      },
      steps: {
        press_release: [
          { title: 'Баспасөз хабарламасы сұрауын алу', desc: 'Жоба түрі "Қоғамдық пікір оқиғасының баспасөз хабарламасы" ретінде анықталды' },
          { title: 'Баспасөз хабарламасы үлгілері мен ережелерін жүктеу', desc: 'БАҚ-қа шығару үлгілері мен полицияның SOP қоғамдық білдіру ережелері сәйкестендірілді' },
          { title: 'Әлеуметтік медиа, веб, бейне және полиция көздерін оқу', desc: 'Көп көзді барлау мәліметтерін қорытындылау және жарамдылықты тексеру' },
          { title: 'Оқиғаның негізгі элементтерін шығару', desc: 'Уақыты, орны, персоналы, көліктері, жою әрекеттері және күйі туралы ақпарат алынды' },
          { title: 'Полицияның SOP құрылымы арқылы баспасөз хабарламасын жобалау', desc: 'Тақырыпты, кіріспені, оқиға мәліметтерін, жою барысын және ресми қорытындыларды құрастыру' },
          { title: 'Сөздерді оңтайландыру және сезімтал мазмұнды тазалау', desc: 'Сөздерді түзету, сәйкестікті тексеру және сезімтал ақпаратты жою орындалуда' },
          { title: 'Соңғы баспасөз хабарламасын жасау', desc: 'Жарияланатын нұсқа жасалды және алдын ала қарау, басып шығару, сақтау және тарату аймақтарына синхрондалды' }
        ],
        official_document: [
          { title: 'Ресми құжат тапсырмасын алу', desc: 'Жоба түрі анықталды: Есеп беру материалы' },
          { title: 'Құжат санатын анықтау', desc: 'Сұраныс/есеп/қадағалау/хабарлама сипаттамалары сәйкестендірілді' },
          { title: 'Мәселенің фоны мен оқиға материалдарын оқу', desc: 'Мәселенің фоны мен алдыңғы жағдайдың қысқаша мазмұны алынды' },
          { title: 'Есеп беру элементтері мен өңдеу бойынша кеңестерді шығару', desc: 'Негізгі алушы мен құжат тақырыбы жасалды' },
          { title: 'Ресми формат арқылы негізгі бөлімді жасау', desc: 'Негізгі бөлім құрылымы мен өңдеу ұсыныстарын реттеу' },
          { title: 'Стиль мен сөз стандарттарын түзету', desc: 'Ресми стильді түзету аяқталды' },
          { title: 'Соңғы ресми жобаны жасау', desc: 'Бастапқы ресми жоба жасалды' }
        ],
        leadership_brief: [
          { title: 'Басшылық брифингі тапсырмасын алу', desc: 'Брифинг нысаны анықталды: Президенттік брифинг' },
          { title: 'Барлауды атқарушылық түйіндемеге сығу', desc: 'Көп көзді барлауды басшылық оқи алатын түйіндемеге сығу' },
          { title: 'Басшылық үшін негізгі нүктелерді анықтау', desc: 'Басшылықтың назарын қажет ететін 4 негізгі нүкте алынды' },
          { title: '“Жағдай-Пайымдау-Кеңес” құрылымын жасау', desc: '“Жағдай-Пайымдау-Кеңес” құрылымы жасалуда' },
          { title: 'Бастапқы брифинг жобасын қалыптастыру', desc: 'Бастапқы брифинг жобасы қалыптасты' },
          { title: 'Президенттік шолу брифингін шығару', desc: 'Президенттік шолу нұсқасының брифингі шығарылды' }
        ],
        public_opinion_report: [
          { title: 'Қоғамдық пікір есебі тапсырмасын алу', desc: 'Оқиға түрі: Қоғамдық пікірді талдау' },
          { title: 'Әлеуметтік медиа мен веб-деректерді жинау', desc: 'Telegram, Instagram және жаңалықтар сайттарынан деректер жиналуда' },
          { title: 'Көңіл-күй мен негізгі тақырыптарды талдау', desc: 'Жасанды интеллект көңіл-күйді (позитивті/негативті) және негізгі назар аударатын мәселелерді анықтауда' },
          { title: 'Тәуекелдерді бағалау және ұсыныстар жасау', desc: 'Ықтимал тәуекелдер мен әрекет ету жоспарлары әзірленуде' },
          { title: 'Қоғамдық пікір туралы соңғы есепті шығару', desc: 'Есеп дайын' }
        ],
        sop_disposal_draft: [
          { title: 'SOP жою тапсырмасын алу', desc: 'Оқиға түрі: Жоғары жылдамдықты соқтығысу' },
          { title: 'Тиісті SOP ережелерін жүктеу', desc: 'Полицияның стандартты операциялық процедуралары сәйкестендірілді' },
          { title: 'Іс-қимыл жоспарын құрастыру', desc: 'Қадамдық жою әрекеттері жасалуда' },
          { title: 'SOP жобасын аяқтау', desc: 'Жоба дайын' }
        ],
        circulation_package: [
          { title: 'Тарату пакеті тапсырмасын алу', desc: 'Құжаттарды жинақтау басталды' },
          { title: 'Қол қою және бекіту тізімін жасау', desc: 'Тиісті тұлғалар мен бөлімдер анықталды' },
          { title: 'Тарату пакетін дайындау', desc: 'Пакет аяқталды' }
        ]
      },
      content: {
        press_release: [
          { title: 'Тақырып', content: '3.21 Алматыдағы ірі жол-көлік оқиғасын жою барысы туралы ресми хабарлама' },
          { title: 'Кіріспе', content: '2026 жылғы 21 наурызда таңертең Алматыдағы Әл-Фараби даңғылында бірнеше көліктің соқтығысуы орын алды. Қазіргі уақытта оқиға орнындағы жұмыстар негізінен аяқталды, тиісті тергеу амалдары жүргізілуде.' },
          { title: 'Оқиғаға шолу', content: 'Апат таңғы сағат 2:15-те болды, оған 3 жеңіл автокөлік пен 1 жеңіл жүк көлігі қатысты. Алдын ала мәлімет бойынша, соқтығысуға жылдамдықты асыру себеп болған.' },
          { title: 'Полицияның жауап беру барысы', content: 'Полиция оқиға орнын дереу қоршауға алды, медициналық бөлімшелер 4 зардап шеккен адамға көмек көрсетті. Қазіргі уақытта жол қозғалысы қалпына келтірілді, қатысқан көліктер эвакуацияланды.' },
          { title: 'Қазіргі ресми қорытынды', content: 'Алдын ала тексеру нәтижесінде негізгі жауапты тұлға мас күйінде көлік жүргізген деп күдіктелуде, тиісті биологиялық сынамалар сараптамаға жіберілді.' },
          { title: 'Қорытынды', content: 'Құрметті азаматтар, өтінеміз, қауесеттерге сенбеңіздер және таратпаңыздар, ресми хабарландыруларды қадағалаңыздар.' }
        ],
        leadership_brief: [
          { title: 'Жағдайды қорытындылау', content: '3.21 апаты салдарынан 4 адам зардап шекті; қоғамдық назар өте жоғары, қоғамдық пікірдің ушығуына жол бермеу керек.' },
          { title: 'Негізгі пайымдау', content: 'Апаттың негізгі жауапкершілігі анық, бірақ оған шетелдік азаматтар қатысты, сондықтан сыртқы істерді үйлестіруге назар аудару қажет.' },
          { title: 'Қазіргі жою күйі', content: 'Оқиға орны толығымен тазартылды, зардап шеккендердің жағдайы тұрақты.' },
          { title: 'Басшылықтың назарын қажет ететін мәселелер', content: '1. Әлеуметтік желілерде жалған бейнелердің таралуы; 2. Зардап шеккендердің отбасыларына психологиялық қолдау көрсету.' },
          { title: 'Келесі қадамдар бойынша ұсыныстар', content: 'Қалалық департаментке бірыңғай ресми хабарлама жариялауды және қоғамдық пікірге ден қоюдың екінші деңгейлі жоспарын іске қосуды ұсынамыз.' }
        ],
        public_opinion_report: [
          { title: 'Тақырып', content: '3.21 Алматыдағы жол-көлік оқиғасының қоғамдық пікірге әсері туралы арнайы есеп' },
          { title: 'Таралу шолуы', content: 'Бұл оқиға 4 сағат ішінде Telegram және Instagram арқылы 2 миллионнан астам қаралым жинады. Көңіл-күйдің 65%-ы теріс, негізінен заңсыз жарыстар туралы қауесеттерге бағытталған.' },
          { title: 'Негізгі назар аударатын мәселелер', content: '1. Zeekr жүргізушісінің жеке басы; 2. Полицияның жарысқа қатысуы туралы айыптаулар; 3. Төтенше жағдайға ден қою жылдамдығы.' },
          { title: 'Тәуекелдерді бағалау', content: 'Егер ресми түсініктеме 12 сағаттан астам уақытқа кешіктірілсе, офлайн наразылықтардың туындау қаупі жоғары.' },
          { title: 'Әрекет ету ұсыныстары', content: 'Жарыс туралы қауесеттерді жоққа шығару және құтқару жұмыстарын көрсету үшін құқық қорғау органдарының бейнежазбаларын дереу жариялау қажет.' }
        ],
        official_document: [
          { title: 'Тақырып', content: 'Түнгі уақытта жол қозғалысы қауіпсіздігін басқаруды күшейту туралы хабарлама' },
          { title: 'Фон', content: 'Әл-Фараби даңғылында болған ірі апатты ескере отырып, түнгі патрульдеу мен бақылау-өткізу пункттерінің жұмысын күшейту қажет.' },
          { title: 'Нұсқаулық', content: '1. Патрульдеу жиілігін 50%-ға арттыру; 2. 10 негізгі қиылыста мобильді радар қондырғыларын орналастыру; 3. Алкогольге қатаң тексеру жүргізу.' },
          { title: 'Орындау', content: 'Барлық аудандық бөлімшелер бүгін сағат 18:00-ге дейін өздерінің орналастыру жоспарларын ұсынуы тиіс.' }
        ],
        sop_disposal_draft: [
          { title: 'Тақырып', content: 'Жоғары жылдамдықты соқтығысу оқиғаларын жою бойынша SOP жобасы' },
          { title: 'Бастапқы әрекеттер', content: '500 метр радиусты қоршауға алу, төтенше жағдай жолағын белсендіру, ең жақын бірінші деңгейлі травматологиялық орталыққа хабарлау.' },
          { title: 'Деректерді сақтау', content: 'Барлық VMS деректерінің қауіпсіздігін қамтамасыз ету, соққы орталығын 3D лазерлік сканерлеуден өткізу, барлық қатысқан электрондық құрылғыларды тәркілеу.' },
          { title: 'Байланыс хаттамасы', content: 'Командалық орталықпен қауіпсіз байланыс орнату, әр 15 минут сайын жаңартуларды ұсыну.' }
        ],
        circulation_package: [
          { title: 'Тақырып', content: 'Тарату пакеті: 3.21 оқиғасы бойынша алдын ала тергеу есебі' },
          { title: 'Тарату тізімі', content: 'Ішкі істер министрі, Алматы полиция департаментінің бастығы, қалалық прокуратура.' },
          { title: 'Бекіту күйі', content: 'Заң бөлімінің қол қоюын күтуде.' }
        ]
      }
    },
    officialVehicles: {
      title: 'Қызметтік көліктердің ерекшеліктерін қадағалау',
      subtitle: 'Аномалияларды бақылау, қарау және жабу жұмыс процесі',
      activeCase: 'Белсенді іс',
      legacyPage: 'Ескі бет',
      compareMode: 'Салыстыру режимі',
      kpis: {
        activeExceptions: 'Белсенді ерекшеліктер',
        highSeverity: 'Жоғары маңыздылық',
        inReview: 'Қаралуда',
        awaitingDispatch: 'Жөнелтуді күтуде',
        longestDelay: 'Ең ұзақ кідіріс',
        unarchivedCases: 'Мұрағатталмаған істер',
      },
      lifecycle: {
        title: 'Аномалияның өмірлік циклін қадағалау',
        completed: 'Аяқталды',
        pending: 'Күтуде',
        delayed: 'Кідіртілді',
      },
      analytics: {
        title: 'Талдауды қадағалау',
        longestDelay: 'Ең ұзақ кідіріс',
        reviewRework: 'Қарауды қайта өңдеу',
        blockers: 'Бөгеушілер',
        closureRate: 'Жабу жылдамдығы',
        bottleneck: 'Критикалық кедергі',
        bottleneckDesc: 'Солтүстік аудандық автокөліктегі техникалық тексеру қазіргі уақытта кіру журналдарының жоқтығынан бұғатталған.',
      },
      workspaces: {
        title: 'Қатысты жұмыс кеңістіктері',
        originalDetail: 'Түпнұсқа мәліметтер',
        maintenanceQueue: 'Техникалық қызмет көрсету кезегі',
        mapMonitor: 'Карта мониторы',
        graphWorkspace: 'График жұмыс кеңістігі',
        videoPanel: 'Бейне панелі',
        archiveRecord: 'Мұрағат жазбасы',
      },
      ui: {
        hideAnalytics: 'Талдауды жасыру',
        showAnalytics: 'Талдауды көрсету',
        evidenceSync: 'Деректерді синхрондау: Белсенді',
        reviewFullCase: 'Толық істі қарау',
      },
      mockData: {
        cases: {
          case1: {
            desc: 'Техникалық қызмет көрсету бюджеті 150%-дан асады; Солтүстік аудандық автокөлікте кіру жазбалары жоқ.',
            action: 'Шұғыл физикалық тексеру және жүргізушімен сұхбат қажет.'
          },
          case2: {
            desc: 'Күнделікті техникалық қызмет көрсету мерзімінен бұрын аяқталды.',
            action: 'Жоқ. Мұрағаттау аяқталды.'
          },
          case3: {
            desc: 'OBD арқылы жабдықтың қалыпсыз тозуы анықталды.',
            action: 'Техникалық аудитті жоспарлау.'
          }
        },
        nodes: {
          detected: 'Анықталды',
          verified: 'Расталды',
          assigned: 'Тағайындалды',
          maintenance: 'Техникалық қызмет көрсету',
          reviewed: 'Қаралды',
          archived: 'Мұрағатталды'
        },
        stats: {
          mission: 'Миссияда',
          idle: 'Бос',
          maintenance: 'Техникалық қызмет көрсету',
          scrapped: 'Жойылған'
        },
        ledger: {
          title: 'Техникалық қызмет көрсету кезегі',
          activeTitle: 'Белсенді миссия паркі',
          anomalyDetected: 'Тіркеу журналының аномалиясы анықталды',
          anomalyDesc: 'Тіркеу журналының ескертуі: Техникалық қызмет көрсету бюджеті 150%-дан асады; Тіркелген жөндеу шеберханасы (Солтүстік аудандық автокөлік) соңғы екі айда бұл көлік бойынша кіру жазбалары жоқтығын хабарлайды.'
        }
      }
    },
    policePersonnel: {
      ledger: {
        title: 'Персонал журналы',
        active: 'Қызметте',
        onLeave: 'Демалыста',
        suspended: 'Шеттетілген',
        search: 'Персоналды іздеу...',
        standby: 'Кезекшілікте',
        inTraining: 'Оқуда',
        forceStatus: 'Алматы күштерінің күйі',
        statsByType: 'Полиция түрі бойынша статистика',
        statsByDistrict: 'Аудандық басқармалар бойынша статистика',
        unit: 'Бөлімше',
        keyAnomalies: '102-бөлімшенің негізгі аномалиялары',
        unitFocus: '102-БӨЛІМШЕГЕ НАЗАР АУДАРУ',
        critical: 'КРИТИКАЛЫҚ',
        normal: 'ҚАЛЫПТЫ',
        stats: {
          total: 'Жалпы персонал',
          active: 'Белсенді',
          special: 'Арнайы операциялар',
          risk: 'Жоғары қауіп'
        },
        types: {
          publicSecurity: 'Қоғамдық қауіпсіздік',
          trafficPolice: 'Жол полициясы',
          criminalInvestigation: 'Қылмыстық іздестіру',
          swat: 'Арнайы жасақ',
          cyberSecurity: 'Киберқауіпсіздік',
          narcotics: 'Есірткіге қарсы күрес',
          internalAdmin: 'Ішкі әкімшілік',
          municipalDirect: 'Қалалық басқарма',
          trafficBureau: 'Жол полициясы басқармасы',
          cid: 'ҚІБ',
          specialOps: 'Арнайы операциялар',
          cyberBureau: 'Кибербасқарма',
          narcoticsBureau: 'Есірткіге қарсы күрес басқармасы',
          generalOffice: 'Жалпы бөлім'
        },
        districts: {
          district102: '102-аудандық басқарма',
          bostandyk: 'Бостандық аудандық басқармасы',
          zhetysu: 'Жетісу аудандық басқармасы',
          medeu: 'Медеу аудандық басқармасы',
          turksib: 'Түрксіб аудандық басқармасы',
          alatau: 'Алатау аудандық басқармасы',
          airport: 'Әуежай басқармасы',
          nauryzbay: 'Наурызбай аудандық басқармасы'
        },
        tags: {
          assetAnomaly: 'Актив аномалиясы',
          abuseOfPower: 'Өкілеттігін асыра пайдалану',
          gangSuspect: 'Қылмыстық топ күдіктісі',
          frequentComplaints: 'Жиі шағымдар',
          disciplinedSlack: 'Тәртіптік босаңдық',
          poorPerformance: 'Төмен өнімділік',
          unstableEmotion: 'Тұрақсыз эмоция',
          illegalExit: 'Заңсыз шығу'
        }
      },
      hologram: {
        profile: 'Персонал профилі',
        rank: 'Шені',
        id: 'Жетон ID',
        unit: 'Бөлімше',
        specialization: 'Мамандануы',
        clearance: 'Рұқсат деңгейі',
        biometrics: 'Биометриялық күйі',
        heartRate: 'Жүрек соғу жиілігі',
        stress: 'Стресс деңгейі',
        location: 'Қазіргі орны',
        selectPersonnel: 'Голограмманы жүктеу үшін персоналды таңдаңыз',
        records: 'Жазбалар',
        operations: 'Операциялар',
        aiInference: 'AI аномалия қорытындысы',
        analyzing: 'ТАЛДАУ...',
        stats: {
          internalBadgeId: 'Ішкі жетон ID',
          passportStatus: 'Паспорт күйі',
          submittedToIA: 'Ішкі істерге тапсырылды',
          issuedWeapon: 'Берілген қару',
          bodycamMac: 'Бейнекамера MAC',
          officeTerminalIp: 'Кеңсе терминалының IP-і',
          mobileTerminalIp: 'Мобильді терминалдың IP-і',
          tabletTerminalIp: 'Планшет терминалының IP-і',
          bloodTypeDna: 'Қан тобы / ДНҚ',
          storedInDatabase: 'Деректер қорында сақталған',
          politicalStatus: 'Саяси мәртебесі',
          rulingPartyMember: 'Билеуші партия мүшесі',
          maritalStatus: 'Отбасылық жағдайы',
          divorced: 'Ажырасқан',
          financialStatus: 'Қаржылық жағдайы',
          recentLargeCredit: 'Жақында алынған ірі несие',
          psychologicalMedical: 'Психологиялық / Медициналық',
          insomniaAnxiety: 'Ұйқысыздық және мазасыздық / Жоғары жүрек соғу жиілігі',
          primaryVehicle: 'Негізгі көлік',
          residentialAddress: 'Тұрғылықты мекенжайы',
          emergencyContact: 'Шұғыл байланыс',
          bankCards: 'Банк карталары',
          cardsAnomaly: 'Карталар (1 аномалия)',
          frequentBaseStations: 'Жиі базалық станциялар',
          frequentRf: 'Жиі РЖ'
        },
        anomalies: {
          spatioTemporal: 'Кеңістіктік-уақыттық аномалия',
          spatioTemporalDesc: 'Түнде (02:00-04:00) юрисдикцияға жатпайтын аймақтарда (Әл-Фараби даңғылындағы элиталық клубтар) заңсыз жиі көрінеді.',
          physiological: 'Физиологиялық аномалия',
          physiologicalDesc: 'Смарт-білезік деректері соңғы уақытта денсаулыққа қатысты маңызды мәселелерді көрсетеді, миссиялар кезінде жүрек соғу жиілігі өте жоғары, бұл мәлімделмеген дәріге тәуелділікті білдіреді.',
          commFinancial: 'Байланыс және қаржылық аномалия',
          commFinancialDesc: 'Шетелдік нөмірлерге хабарласу үшін жалтару құралдарын жиі пайдаланады және жақын туыстарының атына белгісіз қабықша компаниялардан бірнеше шетелдік аударымдар түскен.'
        }
      },
      intelligence: {
        title: 'Персоналдың барлау желісі',
        nodes: 'Түйіндер',
        edges: 'Байланыстар',
        engine: 'Қозғалтқыш',
        secureEnclave: 'Қауіпсіз анклав',
        liveSync: 'Тікелей синхрондау',
        systemActive: 'Жүйе белсенді',
        entities: 'Субъектілер',
        standard: 'Стандартты',
        highRisk: 'Жоғары қауіп',
        medRisk: 'Орташа қауіп',
        confidence: 'Сенімділік',
        confirmed: 'Расталған',
        inferred: 'Болжалды',
        alleged: 'Мәлімделген',
        signalLost: 'СИГНАЛ ЖОҒАЛДЫ',
        activeBaseStation: 'БЕЛСЕНДІ БАЗАЛЫҚ СТАНЦИЯ',
        signalTraffic: 'СИГНАЛ ТРАФИГІНІҢ АҒЫНЫ',
        spoofingWarning: 'Құрылғы сигналын алдау туралы ескерту: Полиция терминалының GPS-і 45 минутқа қолмен бұғатталды, осы уақыт ішінде оператордың жеке құрылғысы 3.21 апатының негізгі аймағына ауысты.',
        ontologyExpanded: 'Субъектілер байланысының онтологиясы (КЕҢЕЙТІЛГЕН)',
        clusters: {
          infrastructure: 'Көлік және инфрақұрылым',
          unknown: 'Белгісіз желі',
          media: 'Медиа және бақылау'
        }
      }
    },
    ontology: {
      title: 'Субъектілер байланысының онтологиясы (Кеңейтілген)',
      nodes: 'Түйіндер',
      edges: 'Байланыстар',
      engine: 'Қозғалтқыш',
      secureEnclave: 'Қауіпсіз анклав',
      liveSync: 'Тікелей синхрондау',
      systemActive: 'Жүйе белсенді',
      entities: 'Субъектілер',
      standard: 'Стандартты',
      highRisk: 'Жоғары қауіп',
      medRisk: 'Орташа қауіп',
      confidence: 'Сенімділік',
      confirmed: 'Расталған',
      inferred: 'Болжалды',
      alleged: 'Мәлімделген',
      clusters: {
        infrastructure: 'Көлік және инфрақұрылым',
        unknown: 'Белгісіз желі',
        media: 'Медиа және бақылау'
      }
    },
    exploration: {
      title: 'Зияткерлік барлау',
      subtitle: 'Министрдің AI басқаруы',
      postIncident: 'Оқиғадан кейінгі талдау',
      search: 'Деректер қорын / кестені / субъектіні іздеу',
      kpis: {
        connected: 'Қосылған деректер қорлары',
        tables: 'Логикалық кестелер',
        governed: 'Басқарылатын',
        activeTasks: 'Белсенді тапсырмалар',
        mappings: 'Субъектілерді салыстыру'
      },
      latency: 'Кідіріс',
      secureEnclave: 'Қауіпсіз анклав',
      operator: 'Оператор',
      progress: {
        title: 'Деректерді басқару және семантикалық түсіну барысы',
        subtitle: '{total} кесте сұралды, {completed} / {total} аяқталды'
      },
      flow: {
        title: 'Барлау ағыны',
        steps: ['Қабылдау', 'Басқару', 'Түсіну', 'Есептеу', 'Құрастыру']
      },
      engine: {
        title: 'Семантикалық қозғалтқыш'
      },
      agent: {
        title: 'Барлау агенті',
        subtitle: 'Семантикалық контекст қозғалтқышы',
        btnStart: 'Зияткерлік барлауды бастау',
        ready: 'Дайын',
        desc: 'Көп көзді гетерогенді деректерді автоматты түрде түсіну, іс деңгейіндегі сұрақ-жауап семантикалық контекстін құру.',
        contextGenerated: 'Істің семантикалық контексті жасалды. Сіз адамдар, көліктер, байланыс, траектория, төлемдер және т.б. туралы сұрай аласыз.',
        placeholder: 'Деректер контексті туралы сұрау...',
        assistantResponse: 'Ағымдағы іс контексті негізінде терең талдау жүргізілуде...'
      },
      insightSuggestions: [
        {
          title: 'Негізгі уақыт терезесіндегі қатысты көліктердің деректер қораралық қозғалыс траекторияларын салыстыру',
          desc: 'Серіктестерді, аңдуларды, кездесулерді немесе аномальды айналып өтулерді анықтау үшін траекторияларды, бақылау-өткізу пункттерін, LBS және төлем деректерін сұраңыз.'
        },
        {
          title: 'Оқиғаға дейінгі және кейінгі аномальды байланыстар мен жоғары жиілікті қатынас субъектілерін шығару',
          desc: 'Телефон нөмірлері, жедел хабар алмасу, байланыс, ортақ орналасу және әлеуметтік байланыстар негізінде жоғары қатысты контактілер мен ықтимал бірлескен қатысушыларды сүзіңіз.'
        },
        {
          title: '“Адам-Көлік-Орын-Уақыт” 4D іс тізбегін автоматты түрде қалпына келтіру',
          desc: 'Негізгі тоқтау нүктелерін, уақыт терезелерін және құрылғы түйіндерін анықтау үшін істің кеңістіктік-уақыттық графигін жасаңыз.'
        }
      ]
    }
  }
};
