/**
 * Real-time Notification Service using SignalR
 * Handles WebSocket connections for real-time updates
 */

import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { tokenManager } from './api';

export interface NotificationEvent {
  type: string;
  data: any;
  timestamp: string;
}

class NotificationService {
  private connection: HubConnection | null = null;
  private isConnected = false;
  private reconnectionAttempts = 0;
  private maxReconnectionAttempts = 5;
  private eventListeners: { [key: string]: ((data: any) => void)[] } = {};

  async start(): Promise<void> {
    if (this.isConnected || this.connection) {
      return;
    }

    const token = tokenManager.getToken();
    if (!token) {
      console.warn('No auth token available for SignalR connection');
      return;
    }

    const hubUrl = process.env.NODE_ENV === 'production'
      ? 'https://notifications.axia-agile.com/notificationHub'
      : 'http://localhost:5006/notificationHub';

    try {
      this.connection = new HubConnectionBuilder()
        .withUrl(hubUrl, {
          accessTokenFactory: () => token
        })
        .withAutomaticReconnect({
          nextRetryDelayInMilliseconds: retryContext => {
            if (retryContext.previousRetryCount < 3) {
              return 2000; // 2 seconds
            } else if (retryContext.previousRetryCount < 5) {
              return 5000; // 5 seconds
            } else {
              return 10000; // 10 seconds
            }
          }
        })
        .configureLogging(LogLevel.Information)
        .build();

      // Setup event handlers
      this.setupEventHandlers();

      await this.connection.start();
      this.isConnected = true;
      this.reconnectionAttempts = 0;
      
      console.log('SignalR Connected successfully');
      this.emit('connected', true);

    } catch (error) {
      console.error('SignalR Connection Error:', error);
      this.handleConnectionError();
    }
  }

  async stop(): Promise<void> {
    if (this.connection) {
      try {
        await this.connection.stop();
      } catch (error) {
        console.error('Error stopping SignalR connection:', error);
      } finally {
        this.connection = null;
        this.isConnected = false;
        this.emit('disconnected', true);
      }
    }
  }

  private setupEventHandlers(): void {
    if (!this.connection) return;

    // Handle reconnection events
    this.connection.onreconnecting(() => {
      this.isConnected = false;
      this.emit('reconnecting', true);
    });

    this.connection.onreconnected(() => {
      this.isConnected = true;
      this.reconnectionAttempts = 0;
      this.emit('reconnected', true);
    });

    this.connection.onclose((error) => {
      this.isConnected = false;
      this.emit('disconnected', error);
      
      if (error) {
        console.error('SignalR connection closed with error:', error);
        this.handleConnectionError();
      }
    });

    // Handle incoming notifications
    this.connection.on('ReceiveNotification', (notification) => {
      this.emit('notification', notification);
      this.showNotificationToast(notification);
    });

    // Handle real-time work item updates
    this.connection.on('WorkItemUpdated', (workItem) => {
      this.emit('workItemUpdated', workItem);
    });

    // Handle real-time sprint updates
    this.connection.on('SprintUpdated', (sprint) => {
      this.emit('sprintUpdated', sprint);
    });

    // Handle task assignments
    this.connection.on('WorkItemAssigned', (assignment) => {
      this.emit('workItemAssigned', assignment);
    });

    // Handle sprint events
    this.connection.on('SprintStarted', (sprint) => {
      this.emit('sprintStarted', sprint);
    });

    this.connection.on('SprintCompleted', (sprint) => {
      this.emit('sprintCompleted', sprint);
    });

    // Handle team updates
    this.connection.on('TeamMemberAdded', (teamMember) => {
      this.emit('teamMemberAdded', teamMember);
    });
  }

  private handleConnectionError(): void {
    this.reconnectionAttempts++;
    if (this.reconnectionAttempts >= this.maxReconnectionAttempts) {
      console.error('Max reconnection attempts reached. Please refresh the page.');
      this.emit('maxReconnectionAttemptsReached', true);
    }
  }

  private showNotificationToast(notification: any): void {
    // Emit event for UI components to handle
    window.dispatchEvent(new CustomEvent('showNotificationToast', {
      detail: notification
    }));
  }

  // Event listener management
  on(event: string, callback: (data: any) => void): void {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    this.eventListeners[event].push(callback);
  }

  off(event: string, callback: (data: any) => void): void {
    if (this.eventListeners[event]) {
      this.eventListeners[event] = this.eventListeners[event].filter(cb => cb !== callback);
    }
  }

  private emit(event: string, data: any): void {
    if (this.eventListeners[event]) {
      this.eventListeners[event].forEach(callback => callback(data));
    }
  }

  // Group management for real-time updates
  async joinProjectGroup(projectId: number): Promise<void> {
    if (this.isConnected && this.connection) {
      try {
        await this.connection.invoke('JoinProjectGroup', projectId.toString());
      } catch (error) {
        console.error('Error joining project group:', error);
      }
    }
  }

  async leaveProjectGroup(projectId: number): Promise<void> {
    if (this.isConnected && this.connection) {
      try {
        await this.connection.invoke('LeaveProjectGroup', projectId.toString());
      } catch (error) {
        console.error('Error leaving project group:', error);
      }
    }
  }

  async joinTeamGroup(teamId: string): Promise<void> {
    if (this.isConnected && this.connection) {
      try {
        await this.connection.invoke('JoinTeamGroup', teamId);
      } catch (error) {
        console.error('Error joining team group:', error);
      }
    }
  }

  async leaveTeamGroup(teamId: string): Promise<void> {
    if (this.isConnected && this.connection) {
      try {
        await this.connection.invoke('LeaveTeamGroup', teamId);
      } catch (error) {
        console.error('Error leaving team group:', error);
      }
    }
  }

  // Public getters
  get connected(): boolean {
    return this.isConnected;
  }

  get connectionState(): string {
    return this.connection?.state || 'Disconnected';
  }
}

export const notificationService = new NotificationService();