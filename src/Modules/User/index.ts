// src/Modules/User/index.ts
import { Service } from 'typedi';
import { iCloudAPI, sendAlert } from '../../Library/iCloud';
import { logger, LogMode } from '../../Library/Logger';

@Service()
export class User {
  public name: string;

  public deviceID: string;

  public async findUserNotifyDevice(deviceName: string): Promise<void> {
    const findMyAPI = iCloudAPI.getService('findme');

    await findMyAPI.refresh();

    for (const [deviceID, device] of findMyAPI.devices) {
      logger.log(LogMode.DEBUG, `Looping over user Devices`, deviceID, device);

      if (device.deviceInfo.name === deviceName) {
        logger.log(
          LogMode.DEBUG,
          `Found device ${deviceName} with the ID of ${deviceID}`,
        );

        this.deviceID = deviceID;
      }
    }
  }

  /**
   * Sends notification to user via her Apple Watch Ultra
   */
  public async notifyUser(options: { subject?: string; text?: string }) {
    return sendAlert(this.deviceID, options);
  }
}
