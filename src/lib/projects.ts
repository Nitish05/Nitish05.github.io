export type Project = {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  stack: string[];
  github?: string;
  /** Static poster image path (always present). */
  poster?: string;
  /** Optional video path that plays on hover. */
  video?: string;
  /** Display accent for the card chrome. */
  accent: "amber" | "cyan";
  /** Deep-dive copy. */
  problem: string;
  approach: string;
  hardware: string;
  result: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "panda-moveit",
    title: "PANDA Manipulator",
    tagline: "MoveIt 2 pick-and-place on a 7-DOF arm.",
    year: "2024",
    stack: ["ROS 2 Humble", "MoveIt 2", "C++", "URDF / Xacro", "Gazebo"],
    github:
      "https://github.com/Nitish05/Motion-Planning-of-PANDA-Manipulator-Using-MoveIt",
    poster: "/projects/panda-moveit.png",
    accent: "amber",
    problem:
      "Build a full pick-and-place pipeline for a 7-DOF Panda arm: collision-aware planning, gripper actuation, multi-waypoint sequencing.",
    approach:
      "ROS 2 Humble + MoveIt 2 motion planning with default to pick to place to return waypoint sequencing. TypeScript + ROS variant of the move-robot script for browser-side control.",
    hardware:
      "Franka Emika Panda (simulated). 7-DOF arm. Two-finger gripper. Gazebo physics. URDF/Xacro robot description.",
    result:
      "End-to-end pick-and-place demo with collision avoidance and per-waypoint gripper actuation. Reproducible in any ROS 2 Humble environment.",
  },
  {
    slug: "mcts-multirobot",
    title: "Multi-Robot MCTS",
    tagline: "Centralized + decentralized planning across TurtleBot3 swarms.",
    year: "2024",
    stack: ["ROS 2 Foxy", "Gazebo 11", "PyTorch", "TurtleBot3", "Docker"],
    poster: "/projects/mcts-multirobot-poster.jpg",
    video: "/projects/mcts-multirobot.mp4",
    accent: "cyan",
    problem:
      "Coordinate multiple robots through cluttered environments with both centralized and decentralized search policies, and analyze where each wins.",
    approach:
      "Monte Carlo Tree Search policy implementations in two flavors: a centralized planner with full observability, and a decentralized variant where each robot runs its own MCTS with shared goal posting. Distributed multi-agent DQN baseline for comparison.",
    hardware:
      "TurtleBot3 (simulated). Gazebo 11. ROS 2 Foxy. Containerized for reproducible runs.",
    result:
      "Documented behavior trade-offs across centralized vs decentralized regimes; baseline numbers and emergent-behavior analysis across adversarial agents.",
  },
  {
    slug: "bipedal-walker",
    title: "Bipedal Walker",
    tagline: "TQC + PPO + TRPO trained for hardcore-mode terrain.",
    year: "2024",
    stack: ["MuJoCo", "Stable-Baselines3", "PyTorch", "OpenAI Gym"],
    github: "https://github.com/Nitish05/Bipedal-Walker",
    poster: "/projects/bipedal-walker-poster.jpg",
    video: "/projects/bipedal-walker.mp4",
    accent: "amber",
    problem:
      "Learn a stable bipedal gait that survives BipedalWalker hardcore-mode terrain: gaps, ladders, stumps, and uneven ground.",
    approach:
      "Train and benchmark TRPO (~25M steps), PPO (~25M steps), and TQC (5M steps) over continuous body, joint, and LIDAR observations with joint-velocity actions. Custom reward shaping wrappers to surface stable balanced gaits without reward hacking.",
    hardware:
      "MuJoCo simulation only. Sim-to-real workflow transferable to Isaac Sim / Isaac Lab.",
    result:
      "TQC produced a balanced natural gait at a fraction of the sample budget. PPO and TRPO both cleared hardcore-mode after reward shaping. 35% reduction in training convergence time vs baseline.",
  },
  {
    slug: "stereosight",
    title: "StereoSight",
    tagline: "Real-time stereo planner on VOXL 2 + PX4.",
    year: "2024",
    stack: [
      "C++",
      "Python",
      "ROS 2",
      "OpenCV",
      "Dijkstra",
      "DBSCAN",
      "TFLite YOLO v11n",
    ],
    github: "https://github.com/Nitish05/StereoSight",
    poster: "/projects/stereosight-poster.jpg",
    video: "/projects/stereosight.mp4",
    accent: "cyan",
    problem:
      "Get a small drone to follow a target and avoid obstacles in real time, on embedded compute, using only stereo perception.",
    approach:
      "Convert sensor_msgs/PointCloud2 into 2D occupancy grids via downsampling, DBSCAN, 2D histogram binning, median filtering, and morphological dilation. Plan with Dijkstra at 10 Hz, replan when waypoints get blocked. Run YOLO v8n in sim, on-device TFLite YOLO v11n on the VOXL 2 via voxl_msgs/Aidetection.",
    hardware:
      "ModalAI VOXL 2 + Sentinel drone with PX4 autopilot. Adaptive downsampling kicks in above 50k points to hold real-time.",
    result:
      "Both indoor sim and on-device inference flight tests demonstrated reliable target-following with obstacle avoidance. Heartbeats at 20 Hz, trajectory setpoints at 10 Hz.",
  },
  {
    slug: "arc-agi-qlora",
    title: "ARC-AGI QLoRA",
    tagline: "Fine-tuning Qwen2.5-1.5B on the abstract reasoning corpus.",
    year: "2025",
    stack: [
      "Hugging Face transformers",
      "peft",
      "trl (SFTTrainer)",
      "bitsandbytes 4-bit nf4",
      "PyTorch",
      "A100",
    ],
    poster: "/projects/arc-agi-qlora-poster.jpg",
    accent: "amber",
    problem:
      "ARC tasks are exact-grid puzzles where 95% pixel accuracy is 0% on ARC. Train a small base model to actually solve them, not approximate them.",
    approach:
      "End-to-end QLoRA pipeline on Qwen2.5-1.5B-Instruct: 4-bit nf4 with double-quant, LoRA r=16 alpha=32 across full attention + MLP. Built the dataset from scratch: 400 training tasks expanded to 50 augmented variants each, prompt/completion JSONL with token-budget filtering. Wrote a strict ARC evaluator that reports exact_match, parse_failures, and shape_mismatches separately.",
    hardware:
      "Production run on A100 40GB. Hardware-aware configs documented for T4 (16GB) through H100 / G4 Blackwell. Cosine LR schedule, warmup 0.03, checkpointing every 100 steps to survive Colab timeouts.",
    result:
      "1 epoch in ~28 minutes on A100. Train loss 0.4801 to 0.07586. Strict-grader taxonomy let me diagnose failure modes (shape vs parse vs content) instead of guessing.",
  },
  {
    slug: "myactuator-rmd",
    title: "MyActuator RMD SDK",
    tagline: "C++17 + ROS 2 driver for X-series CAN bus motors.",
    year: "2026",
    stack: [
      "C++17",
      "Python 3.10+",
      "ROS 2 Humble / Jazzy",
      "pybind11",
      "PyQt6",
      "SocketCAN",
      "CMake 3.20+",
      "GTest",
    ],
    github: "https://github.com/Nitish05/myactuator",
    poster: "/projects/myactuator-rmd-poster.jpg",
    accent: "cyan",
    problem:
      "Bring up the MyActuator RMD X-series quickly across new prototypes. Their out-of-the-box stack does not cover all six control modes or expose Python bindings.",
    approach:
      "Implement the V4.3 protocol over CAN (SocketCAN, candleLight, PEAK PCAN-USB, SLCAN) with all six control modes: position, velocity, torque, free / hand-guided, admittance, MIT-style impedance. Ship a ROS 2 hardware interface, a Python ROS 2 driver via pybind11, a PyQt6 Motor Studio GUI, and a URDF description package.",
    hardware:
      "MyActuator RMD X-series V2 / V3 / V4 (X4 to X15). Up to 32 motors per CAN bus at 1 Mbps. Default 500 Hz control loop. Trajectory record and playback in ROS 2 bag (sqlite3 + MCAP) with hysteresis torque triggers for hybrid playback.",
    result:
      "Bring-up time for new prototypes down by over 60%. 9-axis coordinated motion system shipped on top of the SDK. Open source, used in production.",
  },
  {
    slug: "dual-gantry-cnc",
    title: "Dual-Gantry 6-Axis CNC",
    tagline: "A Klipper-for-CNC fork running synchronized gantries.",
    year: "2025",
    stack: ["Klipper", "Python", "Custom firmware", "G-code", "LinuxCNC"],
    poster: "/projects/dual-gantry-cnc-poster.jpg",
    accent: "amber",
    problem:
      "Drive a dual-gantry 6-axis CNC from a Klipper-style host so the planner gets sub-millimeter accuracy without paying the Mach3 / LinuxCNC tax on every reconfig.",
    approach:
      "Fork Klipper to support synchronized dual gantries on the same logical X axis, add 6-axis kinematics, expose toolpath calibration through the host. Write supporting Python tooling for offline trajectory diff and dry-run.",
    hardware:
      "Two synchronized stepper-driven gantries. Custom MCU firmware. Standard CNC tooling.",
    result:
      "Working tool path execution at sub-mm precision. Supersedes a vendor stack that did not handle dual-gantry sync cleanly.",
  },
  {
    slug: "fr5-drag-teach",
    title: "Fairino FR5 Drag-Teach",
    tagline: "Hand-held painter teleoperator with EMA-filtered IK.",
    year: "2026",
    stack: [
      "Teensy 4.1",
      "Bosch BNO055 IMU",
      "CALT CESI-S2000 encoders",
      "ServoJ",
      "Lua",
      "PyQt6",
    ],
    github: "https://github.com/Nitish05/hikvision-integration",
    poster: "/projects/fr5-drag-teach-poster.jpg",
    accent: "cyan",
    problem:
      "Let a human painter physically lead a Fairino FR5 cobot around in workspace coordinates while the controller follows in real time. No teach pendant, no jog wheel.",
    approach:
      "Teensy 4.1 + BNO055 IMU + 3 CALT CESI-S2000 draw-wire encoders feed a 100 Hz host servo loop. ServoJ + IK with EMA filtering, delta-per-cycle clamping (2.5 mm / 10 ms), workspace-box and spherical reach gates, and DI/DO solenoid trigger control over wired Ethernet at sub-millisecond RTT. Trajectories record to TPD format for autonomous replay.",
    hardware:
      "Fairino FR5 cobot + FRC100-AC controller (firmware V3.8.7-QX). Teensy 4.1, BNO055, 3x draw-wire encoders. Wired Ethernet to host.",
    result:
      "Live drag-to-teach demo with replay and Lua scripting hooks. PyQt6 IO dashboards. 22 passing unit tests.",
  },
];
