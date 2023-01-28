// The properties that a Tarrasque plugin can have
interface TarrasquePluginProps {
  name: string;
  version: string;
  components?: {
    dock?: JSX.Element | null;
  };
}

export class TarrasquePlugin implements TarrasquePluginProps {
  name = '';
  version = '0.0.0';
  components = { dock: null };

  /**
   * Creates an instance of TarrasquePlugin.
   * @param config - The configuration for the plugin
   */
  constructor(config: TarrasquePluginProps) {
    Object.assign(this, config);
  }
}
