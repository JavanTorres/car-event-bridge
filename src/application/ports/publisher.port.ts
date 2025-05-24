export abstract class PublisherPort<T> {
  abstract publish(payload: T): Promise<void>;
}
